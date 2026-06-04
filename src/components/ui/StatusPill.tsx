// src/components/ui/StatusPill.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { PALETTE, RADIUS, FONT } from '../../constants/theme';

export type PillStatus = 'idle' | 'pending' | 'active' | 'warning' | 'error' | 'closed';

interface StatusPillProps {
  status: PillStatus;
  label: string;
}

export function StatusPill({ status, label }: StatusPillProps) {
  const getStyles = () => {
    switch (status) {
      case 'idle': 
        return { bg: PALETTE.graphite, text: PALETTE.textSecondary };
      case 'pending': 
        return { bg: 'rgba(92, 124, 250, 0.1)', text: PALETTE.slateBlue };
      case 'active': 
        return { bg: 'rgba(212, 175, 55, 0.1)', text: PALETTE.mutedGold };
      case 'warning': 
        return { bg: 'rgba(242, 153, 74, 0.1)', text: PALETTE.amberWarning };
      case 'error': 
        return { bg: 'rgba(235, 87, 87, 0.1)', text: PALETTE.deepRed };
      case 'closed': 
        return { bg: 'rgba(39, 174, 96, 0.1)', text: PALETTE.successGreen };
    }
  };

  const current = getStyles();

  return (
    <Animated.View 
      layout={LinearTransition.springify().damping(20).stiffness(200)}
      style={[styles.pill, { backgroundColor: current.bg }]}
    >
      <Text style={[styles.label, { color: current.text }]}>{label}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pill: { 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: RADIUS.round, 
    alignSelf: 'flex-start' 
  },
  label: { 
    ...FONT.caption, 
    fontWeight: '700', 
    textTransform: 'uppercase', 
    letterSpacing: 0.5 
  },
});

