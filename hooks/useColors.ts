import { Colors } from '@/constants';

import { useColorScheme } from './useColorScheme';

export const useColors = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const backgroundColor = theme.background;
  const tintColor = theme.tint;
  const textColor = theme.text;
  const iconColor = theme.icon;
  const primaryColor = theme.primary;
  const primaryLightColor = theme.primaryLight;
  const primaryDarkColor = (theme as any).primaryDark || theme.primary;
  const secondaryColor = theme.secondary;
  const dangerColor = theme.danger;
  const dangerLightColor = theme.dangerLight;
  const cardColor = theme.card;
  const ivoryColor = theme.ivory;

  // New gradient and modern colors
  const gradientStart = (theme as any).gradientStart || theme.primary;
  const gradientMiddle = (theme as any).gradientMiddle || theme.primary;
  const gradientEnd = (theme as any).gradientEnd || theme.primary;
  const successColor = (theme as any).success || '#10B981';
  const warningColor = (theme as any).warning || '#F59E0B';
  const infoColor = (theme as any).info || '#3B82F6';
  const mutedColor = (theme as any).muted || '#F3F4F6';
  const borderColor = (theme as any).border || '#E5E7EB';

  return {
    backgroundColor,
    tintColor,
    textColor,
    iconColor,
    primaryColor,
    primaryLightColor,
    primaryDarkColor,
    secondaryColor,
    cardColor,
    dangerColor,
    dangerLightColor,
    ivoryColor,
    // New colors
    gradientStart,
    gradientMiddle,
    gradientEnd,
    successColor,
    warningColor,
    infoColor,
    mutedColor,
    borderColor,
  };
};
