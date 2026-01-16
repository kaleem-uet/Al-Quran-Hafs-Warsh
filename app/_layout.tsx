import { useEffect } from 'react';
import { I18nManager, InteractionManager, Platform } from 'react-native';

import {
  Amiri_400Regular,
  Amiri_700Bold,
  useFonts,
} from '@expo-google-fonts/amiri';
import {
  Tajawal_400Regular,
  Tajawal_500Medium,
  Tajawal_700Bold,
} from '@expo-google-fonts/tajawal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { HelmetProvider } from 'react-helmet-async';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Notification from '@/components/Notification';
import SEO from '@/components/seo';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/hooks/useTranslation';

import { NotificationProvider } from '../components/NotificationProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Add fade animation to splash screen
SplashScreen.setOptions({ fade: true, duration: 1000 });

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { language } = useTranslation();
  const { backgroundColor, textColor } = useColors();

  const [fontLoaded, fontError] = useFonts({
    Amiri_400Regular,
    Amiri_700Bold,
    Tajawal_400Regular,
    Tajawal_500Medium,
    Tajawal_700Bold,
  });

  useEffect(() => {
    async function applyRTL() {
      // Get language from AsyncStorage
      const storedLang = await AsyncStorage.getItem('AppLanguage');
      const lang = storedLang ? JSON.parse(storedLang) : 'en';
      const shouldBeRTL = lang === 'ar' || lang === 'ur';

      // Check if RTL setting needs to change
      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);

        InteractionManager.runAfterInteractions(async () => {
          if (__DEV__) {
            console.info(
              `RTL changed to ${shouldBeRTL ? 'RTL' : 'LTR'} for language: ${lang}`,
            );
          } else {
            if (Platform.OS === 'web') {
              document.documentElement.setAttribute(
                'dir',
                shouldBeRTL ? 'rtl' : 'ltr',
              );
              document.documentElement.setAttribute('lang', lang);
            } else {
              await Updates.reloadAsync();
            }
          }
        });
      } else {
        // RTL/LTR is correct, just update web attributes if needed
        if (Platform.OS === 'web') {
          document.documentElement.setAttribute(
            'dir',
            shouldBeRTL ? 'rtl' : 'ltr',
          );
          document.documentElement.setAttribute('lang', lang);
        }
      }
    }

    applyRTL();
  }, []);

  useEffect(() => {
    if (fontLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontError, fontLoaded]);

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <NotificationProvider>
      <HelmetProvider>
        <SEO />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <SafeAreaView
              style={{
                flex: 1,
                width: '100%',
                maxWidth: 640,
                alignSelf: 'center',
                backgroundColor:
                  colorScheme === 'dark'
                    ? Colors.dark.background
                    : Colors.light.background,
              }}
            >
              <StatusBar
                style={colorScheme === 'dark' ? 'light' : 'dark'}
                backgroundColor={
                  colorScheme === 'dark'
                    ? Colors.dark.background
                    : Colors.light.background
                }
              />
              <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
              >
                <Stack
                  screenOptions={{
                    headerTitleStyle: {
                      fontFamily: 'Tajawal_700Bold',
                    },
                    headerStyle: {
                      backgroundColor: backgroundColor,
                    },
                    headerTintColor: textColor,
                  }}
                >
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                  <Stack.Screen
                    name="search"
                    options={{
                      title:
                        language === 'en'
                          ? 'Search'
                          : language === 'ur'
                            ? 'تلاش'
                            : 'بحث',
                      headerTitleStyle: {
                        fontFamily: 'Tajawal_400Regular',
                      },
                    }}
                  />
                  <Stack.Screen
                    name="navigation"
                    options={{
                      title:
                        language === 'en'
                          ? 'Navigate'
                          : language === 'ur'
                            ? 'نیویگیٹ'
                            : 'تنقل',
                    }}
                  />
                  <Stack.Screen
                    name="tutorial"
                    options={{
                      headerShown: true,
                      title:
                        language === 'en'
                          ? 'Tutorial'
                          : language === 'ur'
                            ? 'سبق'
                            : 'جولة تعليمية',
                    }}
                  />
                  <Stack.Screen
                    name="tracker"
                    options={{
                      headerShown: true,
                      title:
                        language === 'en'
                          ? 'Daily Ward'
                          : language === 'ur'
                            ? 'روزانہ ورد'
                            : 'الورد اليومي',
                    }}
                  />
                </Stack>
                <Notification />
              </ThemeProvider>
            </SafeAreaView>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </HelmetProvider>
    </NotificationProvider>
  );
}
