import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';

interface DailySummaryBlockProps {
  hours: string;
  earnings: string;
}

export function DailySummaryBlock({ hours, earnings }: DailySummaryBlockProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(100).springify().damping(20)}
      style={styles.block}
    >
      <View style={styles.metricZone}>
        <View style={styles.metricHeader}>
          <Ionicons name="time-outline" size={16} color={PALETTE.textSecondary} />
          <Text style={styles.metricLabel}>Horas registradas</Text>
        </View>

        <Text style={styles.metricValue}>{hours}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.metricZone}>
        <View style={styles.metricHeader}>
          <Ionicons name="cash-outline" size={16} color={PALETTE.mutedGold} />
          <Text style={styles.metricLabel}>Ganancias estimadas</Text>
        </View>

        <Text style={[styles.metricValue, { color: PALETTE.mutedGold }]}>
          {earnings}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    marginHorizontal: SPACING.xl,
    padding: 18,
    borderRadius: RADIUS.cards,
    backgroundColor: PALETTE.graphite,
    marginBottom: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
  },
  metricZone: {
    flex: 1,
    alignItems: 'center',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  metricLabel: {
    ...FONT.caption,
    color: PALETTE.textSecondary,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: PALETTE.textPrimary,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: PALETTE.steelLine,
  },
});
