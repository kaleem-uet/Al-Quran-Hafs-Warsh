import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

import SettingsSVG from '@/assets/svgs/settings.svg';
import ShareSVG from '@/assets/svgs/share.svg';
import WelcomeSVG from '@/assets/svgs/welcome.svg';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/hooks/useTranslation';

export default function MoreScreen() {
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { cardColor, iconColor, textColor } = useColors();
  const { t } = useTranslation();

  const handleShare = async () => {
    let shareUrl = 'https://www.quran.us.kg'; // Default/Web URL

    if (Platform.OS === 'android') {
      shareUrl = 'https://www.lipsum.com/';
    }

    try {
      await Share.share({
        message: t('more.share_message', { url: shareUrl }),
        url: shareUrl,
        title: 'Open Mushaf Native',
      });
    } catch (error: any) {
      setErrorMessage(error.message || t('common.error'));
      setErrorModalVisible(true);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedButton
        onPress={() => router.push('/settings')}
        variant="primary"
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel={t('more.settings')}
        accessibilityHint={t('more.settings')}
      >
        <View style={styles.buttonContent}>
          <SettingsSVG width={24} height={24} style={styles.svg} />
          <Text style={styles.buttonText}>{t('more.settings')}</Text>
        </View>
      </ThemedButton>
      <ThemedButton
        variant="primary"
        onPress={() => router.push('/tutorial')}
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel={t('more.tutorial')}
      >
        <View style={styles.buttonContent}>
          <WelcomeSVG width={24} height={24} style={styles.svg} />
          <Text style={styles.buttonText}>{t('more.tutorial')}</Text>
        </View>
      </ThemedButton>
      <ThemedButton
        onPress={handleShare}
        variant="primary"
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel={t('more.share')}
      >
        <View style={styles.buttonContent}>
          <ShareSVG width={24} height={24} style={styles.svg} />
          <Text style={styles.buttonText}>{t('more.share')}</Text>
        </View>
      </ThemedButton>

      {/* Error Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setErrorModalVisible(false)}
        >
          <ThemedView
            style={[styles.modalContent, { backgroundColor: cardColor }]}
            onStartShouldSetResponder={() => true} // Prevents touch from passing through
          >
            <ThemedView
              style={[styles.modalHeader, { borderBottomColor: textColor }]}
            >
              <ThemedText style={[styles.modalTitle, { color: textColor }]}>
                {t('common.error')}
              </ThemedText>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setErrorModalVisible(false)}
                accessibilityRole="button"
                accessibilityLabel={t('common.close')}
              >
                <Feather name="x" size={24} color={iconColor} />
              </TouchableOpacity>
            </ThemedView>

            <ThemedText style={[styles.modalMessage, { color: textColor }]}>
              {errorMessage}
            </ThemedText>

            <ThemedView style={styles.modalActions}>
              <ThemedButton
                variant="primary"
                onPress={() => setErrorModalVisible(false)}
                style={styles.modalButton}
              >
                {t('common.ok')}
              </ThemedButton>
            </ThemedView>
          </ThemedView>
        </TouchableOpacity>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  button: {
    height: 54,
  },
  buttonContent: {
    flexDirection: 'row',
    width: 300,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    marginStart: 8,
    marginEnd: 8,
    color: 'white',
    fontSize: 17,
    lineHeight: 22,
    paddingHorizontal: 4,
    fontFamily: 'Tajawal_500Medium',
    textAlignVertical: 'center',
    fontWeight: '600',
  },
  svg: {
    color: 'white',
  },

  // Modal Styles (adapted from settings.tsx)
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
    borderRadius: 12,
    padding: 16,
    elevation: 5,
    alignSelf: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    // borderBottomColor will be set by theme
    minHeight: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Tajawal_700Bold',
    textAlignVertical: 'center',
  },
  closeButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Tajawal_400Regular',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the single button
    backgroundColor: 'transparent',
    width: '100%',
  },
  modalButton: {
    width: '40%', // Adjust as needed for a single button
    maxWidth: 120, // Adjust as needed
  },
});
