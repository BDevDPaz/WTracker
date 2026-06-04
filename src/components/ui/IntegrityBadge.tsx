// src/components/ui/IntegrityBadge.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PALETTE, FONT } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export type BadgeType = 'valid' | 'manual' | 'auto' | 'warning' | 'error';

export function IntegrityBadge({ type }: { type: BadgeType }) {
  const getConfig = () => {
    switch (type) {
      case 'valid': return { label: 'VALIDADA', color: PALETTE.successGreen, icon: 'shield-checkmark' as const };
      case 'manual': return { label: 'AJUSTE MANUAL', color: PALETTE.textSecondary, icon: 'create-outline' as const };
      case 'auto': return { label: 'AUTO CIERRE', color: PALETTE.slateBlue, icon: 'time' as const };
      case 'warning': return { label: '! REVISAR', color: PALETTE.amberWarning, icon: 'warning' as const };
      
      // --- NUEVO ESTADO DE CAOS ---
      case 'error': return { label: 'ERROR DATOS', color: PALETTE.deepRed, icon: 'alert-circle' as const }; 
      
      default: return { label: 'DESCONOCIDO', color: PALETTE.textMuted, icon: 'help' as const };
    }
  };

  const config = getConfig();

  return (
    <View style={[styles.badge, { borderColor: config.color }]}>
      <Ionicons name={config.icon} size={12} color={config.color} style={{ marginRight: 4 }} />
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, borderWidth: 1, backgroundColor: 'rgba(0,0,0,0.2)' },
  text: { ...FONT.caption, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
});

