// src/components/ui/DailySummaryBlock.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';

interface DailySummaryBlockProps {
  hours: string;
  earnings: string;
}

export function DailySummaryBlock({ hours, earnings }: DailySummaryBlockProps) {
  return (
    <View style={styles.summaryBlock}>
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>HORAS</Text>
          <Text style={styles.summarySubLabel}>hoy</Text>
        </View>
        <Text style={styles.summaryValue}>{hours}</Text>
      </View>
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>INGRESO</Text>
          <Text style={styles.summarySubLabel}>estimado</Text>
        </View>
        <Text style={[styles.summaryValue, { color: PALETTE.mutedGold }]}>{earnings}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryBlock: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: SPACING.xl, marginBottom: SPACING.lg, gap: SPACING.md },
  summaryCard: { flex: 1, height: 110, borderRadius: 22, padding: SPACING.lg, backgroundColor: PALETTE.graphite, justifyContent: 'space-between' },
  summaryLabel: { ...FONT.label, color: PALETTE.textSecondary },
  summarySubLabel: { fontSize: 12, color: PALETTE.textMuted, marginTop: -2 },
  summaryValue: { fontSize: 28, fontWeight: '700', color: PALETTE.textPrimary },
});

