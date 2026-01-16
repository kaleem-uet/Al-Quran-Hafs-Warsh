import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { useRouter } from 'expo-router';

import { useColors } from '@/hooks/useColors';
import { Surah } from '@/types';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type Props = {
  surah: Surah;
};

export default function SurahCard({ surah }: Props) {
  const router = useRouter();

  const { cardColor, textColor, primaryColor, primaryLightColor, borderColor } = useColors();

  const handlePress = () => {
    router.replace({
      pathname: '/',
      params: { page: surah.startingPage, temporary: 'true' },
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
            {surah.number}
          </ThemedText>
        </ThemedView>

        {/* Surah name - center */}
        <ThemedView style={[styles.nameContainer, { backgroundColor: 'transparent' }]}>
          <ThemedText style={[styles.name, { color: textColor }]} numberOfLines={1}>
            {surah.name}
          </ThemedText>
        </ThemedView>

        {/* Info - right side */}
        <ThemedView style={[styles.infoContainer, { backgroundColor: 'transparent' }]}>
          <ThemedText style={[styles.infoText, { color: textColor, opacity: 0.6 }]}>
            {`${surah.numberOfAyahs} آيات`}
          </ThemedText>
          <ThemedText style={[styles.revelationType, { color: textColor, opacity: 0.5 }]}>
            {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
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
    fontSize: 22,
    fontFamily: 'Amiri_700Bold',
    lineHeight: 32,
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
  revelationType: {
    fontSize: 12,
    fontFamily: 'Tajawal_400Regular',
    marginTop: 2,
  },
});
