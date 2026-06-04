import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

type PillStatus = 'idle' | 'pending' | 'active' | 'warning' | 'error' | 'closed';

interface StatusPillProps {
  status: PillStatus;
  label: string;
}

export function StatusPill({ status, label }: StatusPillProps) {
  // Mapeo inmutable de estilos (Color + Ícono) basado en Blueprint 4
  const getPillConfig = () => {
    switch (status) {
      case 'idle':
      case 'closed':
        return { color: PALETTE.textSecondary, bg: PALETTE.carbonMist, icon: 'moon' as const };
      case 'pending':
        return { color: PALETTE.slateBlue, bg: 'rgba(69, 90, 100, 0.15)', icon: 'time' as const };
      case 'active':
        return { color: PALETTE.successGreen, bg: 'rgba(46, 125, 50, 0.15)', icon: 'location' as const };
      case 'warning':
        return { color: PALETTE.amberWarning, bg: 'rgba(245, 124, 0, 0.15)', icon: 'warning' as const };
      case 'error':
        return { color: PALETTE.deepRed, bg: 'rgba(198, 40, 40, 0.15)', icon: 'alert-circle' as const };
    }
  };

  const config = getPillConfig();

  return (
    <View style={[styles.container, { backgroundColor: config.bg }]}>
      <Ionicons name={config.icon} size={14} color={config.color} />
      <Text style={[styles.label, { color: config.color }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30, // Especificación estricta (Documento 1)
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.pill,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: SPACING.sm, // Espacio entre ícono y texto
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

