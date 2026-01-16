import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ChapterList from '@/components/ChapterList';
import SEO from '@/components/seo';
import SurahList from '@/components/SurahList';
import { ThemedView } from '@/components/ThemedView';
import TopTabs from '@/components/TopTabs';
import { useTranslation } from '@/hooks/useTranslation';
import { ListTabs } from '@/types';

export default function ListsScreen() {
  const [activeTab, setActiveTab] = useState<ListTabs>('surahs');
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <ThemedView
      style={[
        styles.container,
        { paddingTop: insets.top > 0 ? insets.top - 4 : 0 },
      ]}
    >
      <SEO
        title={t('seo.home.title')}
        description={t('seo.home.description')}
      />
      <TopTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'juzs' && <ChapterList />}
        {activeTab === 'surahs' && <SurahList />}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
