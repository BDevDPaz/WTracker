// src/components/ui/Button.tsx
import React from 'react';
import { Text, StyleSheet, Pressable, PressableProps, ActivityIndicator, Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { PALETTE, RADIUS, FONT } from '../../constants/theme';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({ 
  label, 
  variant = 'primary', 
  isLoading = false, 
  style, 
  onPress, 
  disabled, 
  ...props 
}: ButtonProps) {
  
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (e: any) => {
    scale.value = withSpring(0.96, { damping: 20, stiffness: 300 });
    
    // Feedback háptico ligero al contacto inicial (Protección Web)
    if (!disabled && !isLoading && Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (props.onPressIn) props.onPressIn(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withSpring(1, { damping: 20, stiffness: 300 });
    
    if (props.onPressOut) props.onPressOut(e);
  };

  const handlePress = (e: any) => {
    if (disabled || isLoading) return;
    
    // Feedback háptico de ejecución según severidad
    if (Platform.OS !== 'web') {
      if (variant === 'danger') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } else if (variant === 'primary') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }
    
    if (onPress) onPress(e);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary': 
        return { bg: PALETTE.mutedGold, text: PALETTE.obsidian, border: PALETTE.mutedGold };
      case 'secondary': 
        return { bg: 'transparent', text: PALETTE.textPrimary, border: PALETTE.steelLine };
      case 'danger': 
        return { bg: PALETTE.deepRed, text: '#FFF', border: PALETTE.deepRed };
      case 'ghost': 
        return { bg: 'transparent', text: PALETTE.textSecondary, border: 'transparent' };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled || isLoading}
      style={[
        styles.button,
        { backgroundColor: vStyles.bg, borderColor: vStyles.border },
        (disabled || isLoading) && styles.disabled,
        style,
        animatedStyle
      ]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={vStyles.text} />
      ) : (
        <Text style={[styles.label, { color: vStyles.text }]}>{label}</Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: RADIUS.inputs,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  label: {
    ...FONT.bodyStrong,
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});

