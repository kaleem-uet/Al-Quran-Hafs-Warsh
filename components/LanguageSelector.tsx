import React, { useState } from 'react';
import {
  I18nManager,
  InteractionManager,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import * as Updates from 'expo-updates';
import { useAtom } from 'jotai/react';

import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColors } from '@/hooks/useColors';
import { languageAtom } from '@/jotai/atoms';
import { Language } from '@/types/translation';

const LANGUAGES: Array<{
  code: Language;
  name: string;
  nativeName: string;
}> = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
];

export function LanguageSelector() {
  const [language, setLanguage] = useAtom(languageAtom);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null);
  const { textColor, primaryColor, cardColor, iconColor } = useColors();

  const handleLanguageSelect = (newLang: Language) => {
    if (newLang === language) return;

    const currentIsRTL = language === 'ar' || language === 'ur';
    const newIsRTL = newLang === 'ar' || newLang === 'ur';
    const rtlChanged = currentIsRTL !== newIsRTL;

    if (rtlChanged) {
      // Show confirmation modal if RTL/LTR change requires reload
      setPendingLanguage(newLang);
      setConfirmModalVisible(true);
    } else {
      // No reload needed, just switch language
      setLanguage(newLang);
    }
  };

  const handleConfirmLanguageChange = async () => {
    if (!pendingLanguage) return;

    setConfirmModalVisible(false);

    const newIsRTL = pendingLanguage === 'ar' || pendingLanguage === 'ur';

    // Save language preference
    setLanguage(pendingLanguage);

    // Handle RTL/LTR switch
    I18nManager.allowRTL(newIsRTL);
    I18nManager.forceRTL(newIsRTL);

    InteractionManager.runAfterInteractions(async () => {
      if (Platform.OS === 'web') {
        // Web: update DOM attributes and reload
        document.documentElement.setAttribute('dir', newIsRTL ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', pendingLanguage);
        window.location.reload();
      } else {
        // Native: reload app via Updates API
        if (!__DEV__) {
          try {
            await Updates.reloadAsync();
          } catch (error) {
            console.error('Failed to reload app:', error);
          }
        } else {
          console.warn(
            'Dev mode: App reload required for RTL/LTR change. Please restart the app manually.',
          );
        }
      }
    });
  };

  return (
    <>
      <ThemedView style={styles.container}>
        {LANGUAGES.map((lang) => (
          <Pressable
            key={lang.code}
            style={[
              styles.languageOption,
              {
                backgroundColor:
                  language === lang.code ? primaryColor : cardColor,
                borderColor: textColor,
              },
            ]}
            onPress={() => handleLanguageSelect(lang.code)}
            accessibilityRole="radio"
            accessibilityState={{ selected: language === lang.code }}
            accessibilityLabel={`${lang.name} language`}
            accessibilityHint={`Switch to ${lang.name}`}
          >
            <ThemedText
              style={[
                styles.languageText,
                {
                  color: language === lang.code ? 'white' : textColor,
                },
              ]}
            >
              {lang.nativeName}
            </ThemedText>
            {language === lang.code && (
              <Feather name="check" size={20} color="white" />
            )}
          </Pressable>
        ))}
      </ThemedView>

      {/* Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setConfirmModalVisible(false)}
        >
          <ThemedView
            style={[styles.modalContent, { backgroundColor: cardColor }]}
            onStartShouldSetResponder={() => true}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setConfirmModalVisible(false)}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Feather name="x" size={24} color={iconColor} />
            </TouchableOpacity>

            <ThemedView style={styles.modalIconContainer}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: `${primaryColor}15` },
                ]}
              >
                <Feather name="globe" size={40} color={primaryColor} />
              </View>
            </ThemedView>

            <ThemedText style={[styles.modalTitle, { color: textColor }]}>
              Language Change
            </ThemedText>

            <ThemedText style={[styles.modalMessage, { color: textColor }]}>
              Changing the language requires reloading the app. Do you want to
              continue?
            </ThemedText>

            <ThemedView style={styles.modalActions}>
              <ThemedButton
                variant="outlined-primary"
                onPress={() => setConfirmModalVisible(false)}
                style={styles.modalButton}
              >
                Cancel
              </ThemedButton>
              <ThemedButton
                variant="primary"
                onPress={handleConfirmLanguageChange}
                style={styles.modalButton}
              >
                Confirm
              </ThemedButton>
            </ThemedView>
          </ThemedView>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
    backgroundColor: 'transparent',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
  },
  languageText: {
    fontSize: 18,
    fontFamily: 'Tajawal_400Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modalIconContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Tajawal_700Bold',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 28,
  },
  modalMessage: {
    fontSize: 15,
    marginBottom: 28,
    textAlign: 'center',
    fontFamily: 'Tajawal_400Regular',
    lineHeight: 22,
    opacity: 0.85,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    width: '100%',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    minHeight: 48,
  },
});
