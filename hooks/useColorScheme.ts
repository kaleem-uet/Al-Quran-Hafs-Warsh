import { useColorScheme as useSystemColorScheme } from 'react-native';

import { useAtomValue } from 'jotai/react';

import { themePreferenceAtom } from '@/jotai/atoms';

export function useColorScheme(): 'light' | 'dark' {
  const themePreference = useAtomValue(themePreferenceAtom);
  const systemColorScheme = useSystemColorScheme();

  if (themePreference === 'system') {
    return systemColorScheme ?? 'light';
  }

  return themePreference;
}
