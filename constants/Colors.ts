/**
 * Modern purple gradient color scheme
 * Inspired by contemporary Quran app designs with smooth gradients and clean aesthetics
 */

const primary = '#8B5CF6'; // Modern purple
const primaryDark = '#7C3AED'; // Darker purple for gradients
const primaryLight = '#A78BFA'; // Lighter purple
const secondary = '#EC4899'; // Pink accent

const tintColorLight = primary;
const tintColorDark = '#A78BFA';

export const Colors = {
  light: {
    text: '#1F2937', // Dark gray for better readability
    background: '#F9FAFB', // Very light gray background
    tint: tintColorLight,
    icon: '#6B7280', // Medium gray for icons
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorLight,
    primary: '#8B5CF6', // Modern purple
    primaryLight: '#A78BFA', // Light purple
    primaryDark: '#7C3AED', // Dark purple
    secondary: '#EC4899', // Pink accent
    danger: '#EF4444', // Modern red
    dangerLight: '#FCA5A5', // Light red
    ivory: '#FFFFFF', // Pure white cards
    card: '#FFFFFF',
    // Gradient colors
    gradientStart: '#8B5CF6', // Purple
    gradientMiddle: '#9333EA', // Deep purple
    gradientEnd: '#7C3AED', // Dark purple
    // Additional modern colors
    success: '#10B981', // Green
    warning: '#F59E0B', // Amber
    info: '#3B82F6', // Blue
    muted: '#F3F4F6', // Very light gray
    border: '#E5E7EB', // Light gray border
  },
  dark: {
    text: '#F9FAFB', // Very light text
    background: '#111827', // Dark navy background
    tint: tintColorDark,
    icon: '#9CA3AF', // Light gray icons
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorDark,
    primary: '#8B5CF6', // Modern purple
    primaryLight: '#A78BFA', // Light purple
    primaryDark: '#7C3AED', // Dark purple
    secondary: '#EC4899', // Pink accent
    danger: '#EF4444', // Modern red
    dangerLight: '#F87171', // Light red
    ivory: '#1F2937', // Dark card background
    card: '#1F2937',
    // Gradient colors
    gradientStart: '#8B5CF6', // Purple
    gradientMiddle: '#9333EA', // Deep purple
    gradientEnd: '#7C3AED', // Dark purple
    // Additional modern colors
    success: '#10B981', // Green
    warning: '#F59E0B', // Amber
    info: '#3B82F6', // Blue
    muted: '#374151', // Dark gray
    border: '#374151', // Dark border
  },
};
