import { StyleSheet, TouchableOpacity } from 'react-native';

import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/hooks/useTranslation';
import { ListTabs } from '@/types';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type Props = {
  setActiveTab: (tab: ListTabs) => void;
  activeTab: ListTabs;
};

export default function TopTabs({ activeTab, setActiveTab }: Props) {
  const { backgroundColor, textColor, borderColor } = useColors();
  const { t } = useTranslation();

  const handleTabPress = (tab: ListTabs) => {
    setActiveTab(tab);
  };

  return (
    <ThemedView style={[styles.container, { borderBottomColor: borderColor }]}>
      <TouchableOpacity
        onPress={() => handleTabPress('surahs')}
        style={[
          styles.tab,
          activeTab === 'surahs' && {
            backgroundColor: backgroundColor,
            borderBottomWidth: 2,
            borderBottomColor: textColor,
          },
        ]}
      >
        <ThemedText
          style={[
            styles.tabText,
            activeTab === 'surahs' && styles.activeTabText,
            activeTab === 'surahs' && { color: textColor },
          ]}
        >
          {t('lists.surahs')}
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleTabPress('juzs')}
        style={[
          styles.tab,
          activeTab === 'juzs' && {
            backgroundColor: backgroundColor,
            borderBottomWidth: 2,
            borderBottomColor: textColor,
          },
        ]}
      >
        <ThemedText
          style={[
            styles.tabText,
            activeTab === 'juzs' && styles.activeTabText,
            activeTab === 'juzs' && { color: textColor },
          ]}
        >
          {t('lists.juzs')}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Tajawal_700Bold',
    fontWeight: '600',
  },
  activeTabText: {
    fontWeight: '700',
  },
});
