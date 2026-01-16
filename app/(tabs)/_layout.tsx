import React from 'react';

import {
  Feather,
  FontAwesome6,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useAtomValue } from 'jotai/react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/hooks/useTranslation';
import { bottomMenuState } from '@/jotai/atoms';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const menuStateValue = useAtomValue(bottomMenuState);
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={() => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          display: menuStateValue ? 'flex' : 'none',
          justifyContent: 'center',
          flexDirection: 'column-reverse',
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopWidth: 1,
          borderTopColor: Colors[colorScheme ?? 'light'].border || '#E5E7EB',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarLabelStyle: {
          fontFamily: 'Tajawal_500Medium',
          fontSize: 12,
          marginTop: 4,
          marginBottom: 2,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="lists"
        options={{
          title: t('navigation.tabs.index'),
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'view-list' : 'view-list-outline'}
              size={24}
              color={color}
              accessible={true}
              accessibilityLabel={t('accessibility.navigation.index_label')}
              accessibilityHint={t('accessibility.navigation.index_hint')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation.tabs.mushaf'),
          tabBarIcon: ({ color }) => (
            <FontAwesome6
              name="book-quran"
              size={24}
              style={{ marginBottom: -3 }}
              color={color}
              accessible={true}
              accessibilityLabel={t('accessibility.navigation.mushaf_label')}
              accessibilityHint={t('accessibility.navigation.mushaf_hint')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(more)"
        options={{
          title: t('navigation.tabs.more'),
          tabBarIcon: ({ color }) => (
            <Feather
              name="more-horizontal"
              size={24}
              color={color}
              accessible={true}
              accessibilityLabel={t('accessibility.navigation.more_label')}
              accessibilityHint={t('accessibility.navigation.more_hint')}
            />
          ),
        }}
      />
    </Tabs>
  );
}
