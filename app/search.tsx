import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAtom } from 'jotai/react';

import AdvancedSearchSVG from '@/assets/svgs/search-advanced.svg';
import SEO from '@/components/seo';
import { ThemedTextInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColors } from '@/hooks/useColors';
import useDebounce from '@/hooks/useDebounce';
import useQuranMetadata from '@/hooks/useQuranMetadata';
import { useTranslation } from '@/hooks/useTranslation';
import { advancedSearch } from '@/jotai/atoms';
import { QuranText } from '@/types';
import {
  createArabicFuseSearch,
  performAdvancedSearch,
  simpleSearch,
} from '@/utils/searchUtils';

export default function Search() {
  const { quranData, isLoading, error } = useQuranMetadata();
  const [query, setQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [filteredResults, setFilteredResults] = useState<QuranText[]>([]);

  const { iconColor, tintColor, primaryColor, borderColor, cardColor, textColor, backgroundColor } =
    useColors();
  const { t } = useTranslation();

  const [fuseInstance] = useState(() =>
    quranData
      ? createArabicFuseSearch(quranData, ['standard'], {
          threshold: 0.2,
          minMatchCharLength: 2,
        })
      : null,
  );

  const [advancedSearchValue, setAdvancedSearchValue] = useAtom(advancedSearch);

  const handleSearch = useDebounce((text: string) => {
    setQuery(text);
  }, 200);

  useEffect(() => {
    if (!quranData || quranData.length === 0 || !fuseInstance) return;

    if (query.trim() === '') {
      setFilteredResults([]);
      return;
    }

    if (advancedSearchValue) {
      setFilteredResults(
        performAdvancedSearch(fuseInstance, query, ['standard'], quranData),
      );
    } else {
      setFilteredResults(simpleSearch(quranData, query, 'standard'));
    }
  }, [query, quranData, fuseInstance, advancedSearchValue]);

  const handlePress = (item: QuranText) => {
    router.replace({
      pathname: '/',
      params: { page: item.page_id.toString(), temporary: 'true' },
    });
  };

  const renderItem = ({ item }: { item: QuranText }) => {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${item.sura_name} - ${t('lists.page')} ${item.page_id}`}
        onPress={() => handlePress(item)}
        style={[styles.resultCard, { backgroundColor: cardColor, borderColor }]}
      >
        <ThemedText style={styles.uthmaniText}>{item.uthmani}</ThemedText>
        <View style={styles.resultFooter}>
          <View style={[styles.pageLink, { backgroundColor: primaryColor + '15' }]}>
            <Ionicons name="book-outline" size={14} color={primaryColor} />
            <ThemedText style={[styles.pageLinkText, { color: primaryColor }]}>
              {t('lists.page')} {item.page_id}
            </ThemedText>
          </View>
          <ThemedText style={[styles.surahInfo, { color: textColor, opacity: 0.6 }]}>
            {`${item.sura_name} : ${item.aya_id}`}
          </ThemedText>
        </View>
      </Pressable>
    );
  };

  const ListHeader = () => (
    <View style={styles.header}>
      <SEO
        title={t('seo.search.title')}
        description={t('seo.search.description')}
      />
      {/* Search Input */}
      <View style={[styles.searchContainer, { backgroundColor: cardColor, borderColor }]}>
        <View style={[styles.searchIconWrapper, { backgroundColor: primaryColor + '15' }]}>
          {advancedSearchValue ? (
            <AdvancedSearchSVG width={18} height={18} color={primaryColor} />
          ) : (
            <Ionicons name="search" size={18} color={primaryColor} />
          )}
        </View>
        <ThemedTextInput
          variant="outlined"
          style={styles.searchInput}
          placeholder={t('search.placeholder') || 'البحث...'}
          onChangeText={(text) => {
            setInputText(text);
            handleSearch(text);
          }}
          value={inputText}
          accessibilityRole="search"
        />
        <Pressable
          onPress={() => setAdvancedSearchValue(!advancedSearchValue)}
          style={[
            styles.advancedToggle,
            advancedSearchValue && { backgroundColor: primaryColor + '20' },
          ]}
          accessibilityLabel={t('search.advanced_toggle') || 'تبديل البحث المتقدم'}
        >
          <Ionicons
            name={advancedSearchValue ? 'options' : 'options-outline'}
            size={20}
            color={advancedSearchValue ? primaryColor : iconColor}
          />
        </Pressable>
      </View>

      {/* Results count */}
      {query.trim() !== '' && (
        <View style={styles.resultsInfo}>
          <ThemedText style={[styles.resultsCount, { color: textColor, opacity: 0.6 }]}>
            {filteredResults.length > 0
              ? `${filteredResults.length} ${t('search.results') || 'نتيجة'}`
              : t('search.no_results') || 'لا توجد نتائج'}
          </ThemedText>
        </View>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, { backgroundColor }]}>
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={tintColor} />
        </ThemedView>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={[styles.container, { backgroundColor }]}>
        <ThemedView style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={primaryColor} />
          <ThemedText style={styles.errorText}>{`حدث خطأ: ${error}`}</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.gid.toString()}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          query.trim() !== '' ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color={iconColor} style={{ opacity: 0.5 }} />
              <ThemedText style={[styles.emptyText, { opacity: 0.6 }]}>
                {t('search.no_results') || 'لا توجد نتائج'}
              </ThemedText>
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        accessibilityRole="list"
        accessibilityLabel="نتائج البحث"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  searchIconWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Tajawal_400Regular',
    borderWidth: 0,
  },
  advancedToggle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
    borderRadius: 10,
  },
  resultsInfo: {
    marginTop: 12,
    paddingHorizontal: 4,
  },
  resultsCount: {
    fontSize: 13,
    fontFamily: 'Tajawal_500Medium',
  },
  listContent: {
    paddingBottom: 20,
  },
  resultCard: {
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  uthmaniText: {
    fontSize: 20,
    fontFamily: 'Amiri_400Regular',
    lineHeight: 36,
    marginBottom: 12,
  },
  resultFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pageLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  pageLinkText: {
    fontSize: 13,
    fontFamily: 'Tajawal_500Medium',
  },
  surahInfo: {
    fontSize: 14,
    fontFamily: 'Tajawal_500Medium',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Tajawal_500Medium',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Tajawal_500Medium',
  },
});
