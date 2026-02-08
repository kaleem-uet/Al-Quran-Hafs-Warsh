import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { usePathname, useRouter } from 'expo-router';
import { useSetAtom } from 'jotai/react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  runOnJS,
} from 'react-native-reanimated';

import CheckedSVG from '@/assets/svgs/checked.svg';
import NextSVG from '@/assets/svgs/next.svg';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColors } from '@/hooks/useColors';
import useOrientation from '@/hooks/useOrientation';
import { useTranslation } from '@/hooks/useTranslation';
import { finishedTutorial } from '@/jotai/atoms';
import { isRTL } from '@/utils';

export default function TutorialGuide() {
  const router = useRouter();
  const pathname = usePathname();
  const { primaryColor, primaryLightColor } = useColors();
  const setFinishedTutorial = useSetAtom(finishedTutorial);
  const { isLandscape } = useOrientation();
  const { t, isRTL: isRTLLanguage } = useTranslation();
  const [index, setIndex] = useState(0);

  // Define slides using translations
  const SLIDES = [
    {
      title: t('tutorial.slides.welcome.title'),
      description: t('tutorial.slides.welcome.description'),
      image: require('@/assets/images/android-icon.png'),
    },
    {
      title: t('tutorial.slides.mushaf.title'),
      description: t('tutorial.slides.mushaf.description'),
      image: require('@/assets/tutorial/mushaf.png'),
    },
    {
      title: t('tutorial.slides.top_menu.title'),
      description: [
        {
          text: t('tutorial.slides.top_menu.description.0.text' as any),
          align: 'center' as const,
        },
        {
          text: t('tutorial.slides.top_menu.description.1.text' as any),
          align: 'start' as const,
        },
        {
          text: t('tutorial.slides.top_menu.description.2.text' as any),
          align: 'start' as const,
        },
        {
          text: t('tutorial.slides.top_menu.description.3.text' as any),
          align: 'start' as const,
        },
        {
          text: t('tutorial.slides.top_menu.description.4.text' as any),
          align: 'start' as const,
        },
      ],
      image: require('@/assets/tutorial/top-menu.png'),
    },
    {
      title: t('tutorial.slides.search.title'),
      description: [
        {
          text: t('tutorial.slides.search.description.0.text' as any),
          align: 'center' as const,
        },
        {
          text: t('tutorial.slides.search.description.1.text' as any),
          align: 'start' as const,
        },
        {
          text: t('tutorial.slides.search.description.2.text' as any),
          align: 'start' as const,
        },
      ],
      image: require('@/assets/tutorial/search.png'),
    },
    {
      title: t('tutorial.slides.navigation.title'),
      description: [
        {
          text: t('tutorial.slides.navigation.description.0.text' as any),
          align: 'center' as const,
        },
        {
          text: t('tutorial.slides.navigation.description.1.text' as any),
          align: 'start' as const,
        },
        {
          text: t('tutorial.slides.navigation.description.2.text' as any),
          align: 'start' as const,
        },
        {
          text: t('tutorial.slides.navigation.description.3.text' as any),
          align: 'start' as const,
        },
      ],
      image: require('@/assets/tutorial/navigation.png'),
    },
    {
      title: t('tutorial.slides.tracker.title'),
      description: [
        {
          text: t('tutorial.slides.tracker.description.0.text' as any),
          align: 'center' as const,
        },
        {
          text: t('tutorial.slides.tracker.description.1.text' as any),
          align: 'start' as const,
        },
        {
          text: t('tutorial.slides.tracker.description.2.text' as any),
          align: 'start' as const,
        },
        {
          text: t('tutorial.slides.tracker.description.3.text' as any),
          align: 'start' as const,
        },
        {
          text: t('tutorial.slides.tracker.description.4.text' as any),
          align: 'start' as const,
        },
      ],
      image: require('@/assets/tutorial/tracker.png'),
    },
    {
      title: t('tutorial.slides.settings.title'),
      description: [
        {
          text: t('tutorial.slides.settings.description.0.text' as any),
          align: 'center' as const,
        },
        {
          text: t('tutorial.slides.settings.description.1.text' as any),
          align: 'start' as const,
        },
        {
          text: t('tutorial.slides.settings.description.2.text' as any),
          align: 'start' as const,
        },
      ],
      image: require('@/assets/tutorial/settings.png'),
    },
  ];

  const finishTutorial = () => {
    setFinishedTutorial(true);
    if (pathname !== '/') {
      router.replace('/');
    }
  };

  const gestureHandler = Gesture.Pan().onEnd((e) => {
    const threshold = isLandscape ? 150 : 100;

    if (e.translationX < -threshold && index > 0) {
      runOnJS(setIndex)(index - 1);
    } else if (e.translationX > threshold && index < SLIDES.length - 1) {
      runOnJS(setIndex)(index + 1);
    }
  });

  return (
    <GestureDetector gesture={gestureHandler}>
      <Animated.View
        entering={isRTL ? FadeInLeft.duration(500) : FadeInRight.duration(500)}
        exiting={isRTL ? FadeOutRight.duration(500) : FadeOutLeft.duration(500)}
        style={styles.animatedContainer}
      >
        <ThemedView style={styles.mainContainer}>
          <ScrollView>
            <ThemedView style={styles.ScrollContent}>
              <Image
                source={SLIDES[index].image}
                style={styles.image}
                resizeMode="contain"
              />

              <View style={styles.textContainer}>
                <ThemedText style={styles.title}>
                  {SLIDES[index].title}
                </ThemedText>
                {Array.isArray(SLIDES[index].description) ? (
                  SLIDES[index].description.map((item, i) => (
                    <ThemedText
                      key={i}
                      style={[
                        styles.description,
                        item.align !== 'start' && { textAlign: 'center' },
                      ]}
                    >
                      {item.align === 'start' ? '✓ ' : ''}
                      {item.text}
                    </ThemedText>
                  ))
                ) : (
                  <ThemedText
                    style={[styles.description, { textAlign: 'center' }]}
                  >
                    {SLIDES[index].description}
                  </ThemedText>
                )}
              </View>
            </ThemedView>
          </ScrollView>

          <ThemedView style={styles.controlsContainer}>
            <View style={styles.dotsContainer}>
              {SLIDES.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i === index && styles.activeDot,
                    i === index && { backgroundColor: primaryColor },
                  ]}
                />
              ))}
            </View>

            <ThemedButton
              onPress={
                index < SLIDES.length - 1
                  ? () => setIndex(index + 1)
                  : finishTutorial
              }
              variant="primary"
              style={styles.button}
            >
              <View style={styles.buttonContent}>
                {index < SLIDES.length - 1 ? (
                  <>
                    {!isRTLLanguage && (
                      <View style={{ transform: [{ scaleX: -1 }] }}>
                        <NextSVG
                          width={24}
                          height={24}
                          style={styles.buttonIcon}
                        />
                      </View>
                    )}
                    <Text style={styles.buttonText}>{t('common.next')}</Text>
                    {isRTLLanguage && (
                      <NextSVG width={24} height={24} style={styles.buttonIcon} />
                    )}
                  </>
                ) : (
                  <>
                    <Text style={styles.buttonText}>{t('common.finish')}</Text>
                    <CheckedSVG
                      width={24}
                      height={24}
                      style={styles.buttonIcon}
                    />
                  </>
                )}
              </View>
            </ThemedButton>
            <View style={styles.closeButtonContainer}>
              <Pressable onPress={finishTutorial}>
                <Text
                  style={[styles.closeButtonText, { color: primaryLightColor }]}
                >
                  {t('common.skip')}
                </Text>
              </Pressable>
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: 'transparent',
                }}
              />
            </View>
          </ThemedView>
        </ThemedView>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    padding: 2,
    width: '100%',
    maxWidth: 640,
    position: 'relative',
  },
  closeButtonContainer: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 10,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontFamily: 'Tajawal_400Regular',
    fontSize: 18,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 10,
    alignSelf: 'center',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Tajawal_700Bold',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 10,
    width: '95%',
    marginBottom: 10,
    fontFamily: 'Tajawal_400Regular',
  },
  controlsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  ScrollContent: {},
  dot: {
    width: 5,
    height: 5,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: '#E0E0E0',
  },
  activeDot: {
    width: 15,
    height: 15,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
    marginTop: 10,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Tajawal_500Medium',
    paddingHorizontal: 5,
  },
  buttonIcon: {
    color: 'white',
  },
});
