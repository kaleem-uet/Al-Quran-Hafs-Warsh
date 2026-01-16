import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

import { useColors } from '@/hooks/useColors';

export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'outlined-primary'
    | 'outlined-secondary'
    | 'danger'
    | 'danger-secondary'
    | 'outlined-danger'
    | 'outlined-danger-secondary';
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  variant = 'default',
  children,
  ...rest
}: ThemedButtonProps) {
  const { primaryColor, secondaryColor, dangerColor, dangerLightColor } =
    useColors();
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: primaryColor,
          borderColor: primaryColor,
          color: 'white',
        };
      case 'secondary':
        return {
          backgroundColor: secondaryColor,
          borderColor: secondaryColor,
          color: 'white',
        };
      case 'outlined-primary':
        return {
          backgroundColor: 'transparent',
          borderColor: primaryColor,
          color: primaryColor,
          noShadow: true,
        };
      case 'outlined-secondary':
        return {
          backgroundColor: 'transparent',
          borderColor: secondaryColor,
          color: secondaryColor,
          noShadow: true,
        };
      case 'danger':
        return {
          backgroundColor: dangerColor,
          borderColor: dangerColor,
          color: 'white',
        };
      case 'danger-secondary':
        return {
          backgroundColor: dangerLightColor,
          borderColor: dangerLightColor,
          color: 'white',
        };
      case 'outlined-danger':
        return {
          backgroundColor: 'transparent',
          borderColor: dangerColor,
          color: dangerColor,
          noShadow: true,
        };
      case 'outlined-danger-secondary':
        return {
          backgroundColor: 'transparent',
          borderColor: dangerLightColor,
          color: dangerLightColor,
          noShadow: true,
        };
      case 'default':
      default:
        return {
          backgroundColor: 'blue',
          borderColor: 'blue',
          color: 'white',
        };
    }
  };

  const variantStyles = getVariantStyles() as any;

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          borderWidth: 1,
        },
        isPressed && { opacity: 0.8 },
        styles.base,
        variantStyles.noShadow && styles.noShadow,
        style,
      ]}
      activeOpacity={0.8}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          styles.center,
          { color: variantStyles.color, backgroundColor: 'transparent' },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16, // More rounded for modern look
    height: 54, // Slightly taller
    width: '90%',
    maxWidth: 640,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(139, 92, 246, 0.25)', // Purple shadow
    elevation: 6,
  },
  noShadow: {
    boxShadow: 'none',
    elevation: 0,
  },
  text: {
    fontFamily: 'Tajawal_500Medium',
    fontSize: 17,
    fontWeight: '600', // Slightly bolder for better readability
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
});
