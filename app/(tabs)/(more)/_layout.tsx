import { Stack } from 'expo-router';

import { useColors } from '@/hooks/useColors';
import { useTranslation } from '@/hooks/useTranslation';

export default function MoreLayout() {
  const { t } = useTranslation();
  const { backgroundColor, textColor } = useColors();

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontFamily: 'Tajawal_400Regular',
        },
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: textColor,
      }}
    >
      <Stack.Screen
        name="settings"
        options={{ headerShown: true, title: t('navigation.screens.settings') }}
      />
    </Stack>
  );
}
