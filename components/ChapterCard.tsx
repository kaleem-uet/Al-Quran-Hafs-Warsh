import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { useRouter } from 'expo-router';

import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/hooks/useTranslation';
import { Chapter } from '@/types';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type Props = {
  chapter: Chapter;
};

export default function ChapterCard({ chapter }: Props) {
  const router = useRouter();
  const { cardColor, textColor, primaryColor, primaryLightColor, borderColor } = useColors();
  const { t } = useTranslation();

  const handlePress = () => {
    router.replace({
      pathname: '/',
      params: { page: chapter.startingPage, temporary: 'true' },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, { backgroundColor: cardColor, borderColor }]}
    >
      <ThemedView style={[styles.content, { backgroundColor: 'transparent' }]}>
        {/* Number badge */}
        <ThemedView style={[styles.numberContainer, { backgroundColor: primaryLightColor + '20' }]}>
          <ThemedText style={[styles.number, { color: primaryColor }]}>
            {chapter.number}
          </ThemedText>
        </ThemedView>

        {/* Juz name - center */}
        <ThemedView style={[styles.nameContainer, { backgroundColor: 'transparent' }]}>
          <ThemedText style={[styles.name, { color: textColor }]} numberOfLines={1}>
            {chapter.name}
          </ThemedText>
        </ThemedView>

        {/* Page info - right side */}
        <ThemedView style={[styles.infoContainer, { backgroundColor: 'transparent' }]}>
          <ThemedText style={[styles.infoText, { color: textColor, opacity: 0.6 }]}>
            {t('lists.page')} {chapter.startingPage}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 640,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    elevation: 2,
    marginVertical: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  numberContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 16,
    fontFamily: 'Tajawal_700Bold',
    fontWeight: '700',
    textAlign: 'center',
  },
  nameContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Tajawal_700Bold',
    lineHeight: 28,
    textAlign: 'left',
  },
  infoContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 13,
    fontFamily: 'Tajawal_500Medium',
  },
});
