import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export type PillStatus =
  | 'idle'
  | 'pending'
  | 'active'
  | 'warning'
  | 'error'
  | 'closed';

interface StatusPillProps {
  status: PillStatus;
  label: string;
}

export function StatusPill({ status, label }: StatusPillProps) {
  const getConfig = () => {
    switch (status) {
      case 'idle':
        return {
          bg: PALETTE.graphite,
          text: PALETTE.textSecondary,
          icon: 'pause-outline' as const,
        };

      case 'pending':
        return {
          bg: 'rgba(92, 124, 250, 0.1)',
          text: PALETTE.slateBlue,
          icon: 'time-outline' as const,
        };

      case 'active':
        return {
          bg: 'rgba(212, 175, 55, 0.1)',
          text: PALETTE.mutedGold,
          icon: 'play-outline' as const,
        };

      case 'warning':
        return {
          bg: 'rgba(242, 153, 74, 0.1)',
          text: PALETTE.amberWarning,
          icon: 'warning-outline' as const,
        };

      case 'error':
        return {
          bg: 'rgba(235, 87, 87, 0.1)',
          text: PALETTE.deepRed,
          icon: 'alert-circle-outline' as const,
        };

      case 'closed':
        return {
          bg: 'rgba(39, 174, 96, 0.1)',
          text: PALETTE.successGreen,
          icon: 'checkmark-done-outline' as const,
        };
    }
  };

  const config = getConfig();

  return (
    <Animated.View
      layout={LinearTransition.springify().damping(20).stiffness(200)}
      style={[styles.pill, { backgroundColor: config.bg }]}
    >
      <Ionicons
        name={config.icon}
        size={14}
        color={config.text}
        style={styles.icon}
      />

      <Text style={[styles.label, { color: config.text }]}>
        {label}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.round,
    alignSelf: 'flex-start',
  },

  icon: {
    marginRight: SPACING.xs,
  },

  label: {
    ...FONT.caption,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
