import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { PALETTE, RADIUS, FONT } from '../../constants/theme';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  style?: ViewStyle;
}

export function Button({ 
  label, 
  variant = 'primary', 
  onPress, 
  disabled = false, 
  isLoading = false,
  style 
}: ButtonProps) {
  
  // Mapeo estricto de colores según la variante (Blueprint 1)
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: PALETTE.mutedGold, color: PALETTE.obsidian, borderColor: PALETTE.mutedGold };
      case 'danger':
        return { backgroundColor: PALETTE.deepRed, color: PALETTE.textPrimary, borderColor: PALETTE.deepRed };
      case 'secondary':
        return { backgroundColor: PALETTE.carbonMist, color: PALETTE.textPrimary, borderColor: PALETTE.steelLine };
      case 'ghost':
        return { backgroundColor: 'transparent', color: PALETTE.textSecondary, borderColor: 'transparent' };
      default:
        return { backgroundColor: PALETTE.mutedGold, color: PALETTE.obsidian, borderColor: PALETTE.mutedGold };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      style={({ pressed }) => [
        styles.button,
        { 
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          borderWidth: variant === 'secondary' ? 1 : 0,
          opacity: (disabled || isLoading) ? 0.5 : pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }] // Micro-escala (motion rules Documento 2)
        },
        style
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={variantStyles.color} />
      ) : (
        <Text style={[styles.label, { color: variantStyles.color }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54, // Altura estricta del Blueprint
    borderRadius: RADIUS.inputs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: FONT.bodyStrong.fontSize,
    fontWeight: FONT.bodyStrong.fontWeight,
  },
});

