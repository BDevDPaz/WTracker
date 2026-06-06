import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  FadeInDown,
} from 'react-native-reanimated';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { EngineState } from './OperationalHeroCard';
import { Ionicons } from '@expo/vector-icons';

interface SystemHealthBlockProps {
  engineState: EngineState;
}

export function SystemHealthBlock({ engineState }: SystemHealthBlockProps) {
  const isTracking = ['ESPERANDO_LLEGADA', 'EN_TRASLADO', 'ACTIVA'].includes(engineState);
  const isIssue = ['ASINCRONIA_CHECKIN', 'NO_SHOW', 'SALIDA_DETECTADA'].includes(engineState);

  const pulseOpacity = useSharedValue(1);

  useEffect(() => {
    if (isTracking) {
      pulseOpacity.value = withRepeat(
        withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else {
      pulseOpacity.value = withTiming(1, { duration: 300 });
    }
  }, [isTracking]);

  const animatedDotStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  const gpsColor = isIssue
    ? PALETTE.deepRed
    : isTracking
    ? PALETTE.successGreen
    : PALETTE.textMuted;

  const syncColor = isIssue
    ? PALETTE.amberWarning
    : PALETTE.successGreen;

  return (
    <Animated.View
      entering={FadeInDown.delay(200).springify().damping(20)}
      style={styles.block}
    >
      <Text style={styles.title}>Estado del sistema</Text>

      <View style={styles.row}>
        <Animated.View
          style={[styles.dot, { backgroundColor: gpsColor }, animatedDotStyle]}
        />

        <Ionicons
          name="locate-outline"
          size={16}
          color={gpsColor}
          style={styles.icon}
        />

        <Text style={styles.text}>
          {isTracking
            ? 'Ubicación activa'
            : isIssue
            ? 'Problema de ubicación'
            : 'Ubicación inactiva'}
        </Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: syncColor }]} />

        <Ionicons
          name="sync-outline"
          size={16}
          color={syncColor}
          style={styles.icon}
        />

        <Text style={styles.text}>
          {isIssue
            ? 'Pendiente de sincronización'
            : 'Sincronización activa'}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginHorizontal: SPACING.xl,
    padding: 18,
    borderRadius: RADIUS.cards,
    backgroundColor: PALETTE.graphite,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
  },

  title: {
    ...FONT.h3,
    fontSize: 16,
    color: PALETTE.textPrimary,
    marginBottom: SPACING.md,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },

  icon: {
    marginRight: SPACING.sm,
  },

  text: {
    ...FONT.body,
    color: PALETTE.textSecondary,
    fontSize: 14,
  },
});
