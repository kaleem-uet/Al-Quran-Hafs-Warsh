import { useState } from 'react';
import { Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useAtom } from 'jotai/react';
import { ScrollView } from 'react-native-gesture-handler';
import Toggle from 'react-native-toggle-input';

import { LanguageSelector } from '@/components/LanguageSelector';
import SegmentedControl from '@/components/SegmentControl';
import SEO from '@/components/seo';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/hooks/useTranslation';
import {
  flipSound,
  mushafRiwaya,
  themePreferenceAtom,
  type ThemePreference,
} from '@/jotai/atoms';
import { RiwayaByIndice, RiwayaByValue } from '@/utils';
import { clearStorageAndReload } from '@/utils/storage/clearStorage';

export default function SettingsScreen() {
  const [isFlipSoundEnabled, setIsFlipSoundEnabled] = useAtom(flipSound);
  const [themePreference, setThemePreference] = useAtom(themePreferenceAtom);
  const { t } = useTranslation();
  const riwayaTranslatedOptions = [
    t('settings.riwaya.options.hafs'),
    t('settings.riwaya.options.warsh'),
  ];
  const themeOptions = [
    t('settings.theme.options.system'),
    t('settings.theme.options.light'),
    t('settings.theme.options.dark'),
  ];
  const themeValues: ThemePreference[] = ['system', 'light', 'dark'];
  const { textColor, primaryColor, cardColor, iconColor, borderColor, backgroundColor } =
    useColors();
  const [mushafRiwayaValue, setMushafRiwayaValue] = useAtom(mushafRiwaya);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const toggleFlipSoundSwitch = () => {
    setIsFlipSoundEnabled((previousState) => !previousState);
  };

  return (
    <ThemedView style={styles.wrapper}>
      <ScrollView
        style={{ backgroundColor }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <SEO
          title={t('seo.settings.title')}
          description={t('seo.settings.description')}
        />

        {/* Language Selection */}
        <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconWrapper, { backgroundColor: primaryColor + '15' }]}>
              <Feather name="globe" size={20} color={primaryColor} />
            </View>
            <ThemedText style={styles.cardTitle}>
              {t('settings.language.label')}
            </ThemedText>
          </View>
          <LanguageSelector />
        </View>

        {/* Theme Selection */}
        <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconWrapper, { backgroundColor: primaryColor + '15' }]}>
              <Feather name="moon" size={20} color={primaryColor} />
            </View>
            <ThemedText style={styles.cardTitle}>
              {t('settings.theme.label')}
            </ThemedText>
          </View>
          <Pressable
            style={styles.fullWidth}
            accessibilityRole="radiogroup"
            accessibilityLabel={t('settings.theme.accessibility_label')}
            accessibilityHint={t('settings.theme.accessibility_hint')}
          >
            <SegmentedControl
              options={themeOptions}
              initialSelectedIndex={themeValues.indexOf(themePreference)}
              activeColor={primaryColor}
              textColor={primaryColor}
              onSelectionChange={(index: number) => {
                setThemePreference(themeValues[index]);
              }}
            />
          </Pressable>
        </View>

        {/* Page Flip Sound */}
        <Pressable
          style={[styles.card, styles.rowCard, { backgroundColor: cardColor, borderColor }]}
          onPress={toggleFlipSoundSwitch}
          accessibilityRole="switch"
          accessibilityLabel={t('settings.page_flip_sound.accessibility_label')}
          accessibilityHint={t('settings.page_flip_sound.accessibility_hint')}
          accessibilityState={{ checked: isFlipSoundEnabled }}
        >
          <View style={styles.rowCardLeft}>
            <View style={[styles.iconWrapper, { backgroundColor: primaryColor + '15' }]}>
              <Feather name="volume-2" size={20} color={primaryColor} />
            </View>
            <ThemedText style={styles.cardTitle}>
              {t('settings.page_flip_sound.label')}
            </ThemedText>
          </View>
          <Toggle
            color={primaryColor}
            size={28}
            circleColor={primaryColor}
            toggle={isFlipSoundEnabled}
            setToggle={toggleFlipSoundSwitch}
            aria-checked={isFlipSoundEnabled}
            accessibilityLabel={t('settings.page_flip_sound.accessibility_label')}
            accessibilityState={{ checked: isFlipSoundEnabled }}
          />
        </Pressable>

        {/* Riwaya Selection */}
        <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconWrapper, { backgroundColor: primaryColor + '15' }]}>
              <Feather name="book-open" size={20} color={primaryColor} />
            </View>
            <ThemedText style={styles.cardTitle}>
              {t('settings.riwaya.label')}
            </ThemedText>
          </View>
          <Pressable style={styles.fullWidth} accessibilityRole="radiogroup">
            <SegmentedControl
              options={riwayaTranslatedOptions}
              initialSelectedIndex={RiwayaByIndice(mushafRiwayaValue)}
              activeColor={primaryColor}
              textColor={primaryColor}
              onSelectionChange={(index: number) => {
                const selectedRiwaya = RiwayaByValue(index);
                setMushafRiwayaValue(selectedRiwaya);
              }}
            />
          </Pressable>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerSection}>
          <ThemedButton
            role="button"
            variant="danger"
            onPress={() => setConfirmModalVisible(true)}
            style={styles.resetButton}
          >
            {t('settings.reset.button')}
          </ThemedButton>
        </View>

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
              <ThemedView style={[styles.modalHeader, { borderBottomColor: borderColor }]}>
                <ThemedText style={styles.modalTitle}>
                  {t('settings.reset.confirm_title')}
                </ThemedText>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setConfirmModalVisible(false)}
                  accessibilityRole="button"
                  accessibilityLabel={t('common.close')}
                >
                  <Feather name="x" size={24} color={iconColor} />
                </TouchableOpacity>
              </ThemedView>

              <ThemedText style={styles.modalMessage}>
                {t('settings.reset.confirm_message')}
              </ThemedText>

              <ThemedView style={styles.modalActions}>
                <ThemedButton
                  variant="outlined-primary"
                  onPress={() => setConfirmModalVisible(false)}
                  style={styles.modalButton}
                >
                  {t('common.cancel')}
                </ThemedButton>
                <ThemedButton
                  variant="danger"
                  onPress={() => {
                    setConfirmModalVisible(false);
                    clearStorageAndReload();
                  }}
                  style={styles.modalButton}
                >
                  {t('common.confirm')}
                </ThemedButton>
              </ThemedView>
            </ThemedView>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 12,
  },
  card: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: 'Tajawal_600SemiBold',
  },
  fullWidth: {
    width: '100%',
  },
  dangerSection: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    marginTop: 8,
    paddingTop: 16,
  },
  resetButton: {
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Tajawal_700Bold',
  },
  closeButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 15,
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Tajawal_400Regular',
    lineHeight: 22,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    maxWidth: 140,
  },
});
