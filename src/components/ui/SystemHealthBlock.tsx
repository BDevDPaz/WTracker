// src/components/ui/SystemHealthBlock.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { EngineState } from './OperationalHeroCard';

interface SystemHealthBlockProps {
  engineState: EngineState;
}

export function SystemHealthBlock({ engineState }: SystemHealthBlockProps) {
  return (
    <View style={styles.healthBlock}>
      <Text style={styles.sectionTitle}>Estado del sistema</Text>
      
      <View style={styles.healthRow}>
        <View style={styles.healthDotWrapper}><View style={[styles.healthDot, { backgroundColor: PALETTE.successGreen }]} /></View>
        <Text style={styles.healthText}>Ubicación activa</Text>
      </View>
      
      <View style={styles.healthRow}>
        <View style={styles.healthDotWrapper}><View style={[styles.healthDot, { backgroundColor: engineState !== 'NO_INICIADA' ? PALETTE.successGreen : PALETTE.textMuted }]} /></View>
        <Text style={styles.healthText}>
          {engineState !== 'NO_INICIADA' ? 'Zona configurada' : 'Sin zona activa'}
        </Text>
      </View>

      <View style={styles.healthRow}>
        <View style={styles.healthDotWrapper}><View style={[styles.healthDot, { backgroundColor: PALETTE.successGreen }]} /></View>
        <Text style={styles.healthText}>Notificaciones activas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  healthBlock: { marginHorizontal: SPACING.xl, padding: SPACING.lg, borderRadius: RADIUS.cards, backgroundColor: PALETTE.graphite, marginBottom: SPACING.lg },
  sectionTitle: { ...FONT.h3, fontSize: 18, color: PALETTE.textPrimary, marginBottom: SPACING.md },
  healthRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  healthDotWrapper: { width: 20, alignItems: 'center' },
  healthDot: { width: 8, height: 8, borderRadius: 4 },
  healthText: { ...FONT.body, fontSize: 14, color: PALETTE.textSecondary, marginLeft: SPACING.sm },
});

