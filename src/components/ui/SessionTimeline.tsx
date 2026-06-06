import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { EngineState } from './OperationalHeroCard';

interface SessionTimelineProps {
  engineState: EngineState;
}

export function SessionTimeline({ engineState }: SessionTimelineProps) {
  const hasStarted = engineState !== 'NO_INICIADA';
  const hasArrived = ['ACTIVA', 'SALIDA_DETECTADA', 'CERRADA'].includes(engineState);

  return (
    <View style={styles.timelineBlock}>
      <Text style={styles.sectionTitle}>Actividad de la jornada</Text>

      {!hasStarted ? (
        <Animated.Text
          entering={FadeInDown.duration(400)}
          style={styles.emptyText}
        >
          Aún no hay actividad.
        </Animated.Text>
      ) : (
        <View style={styles.timeline}>
          
          <Animated.View
            entering={FadeInDown.delay(100).springify().damping(18)}
            style={styles.timelineNode}
          >
            <View style={[styles.nodeDot, styles.startDot]} />
            <View style={styles.nodeLine} />
            <View>
              <Text style={styles.nodeTitle}>Inicio de jornada</Text>
              <Text style={styles.nodeTime}>08:14 AM</Text>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(250).springify().damping(18)}
            style={styles.timelineNode}
          >
            <View
              style={[
                styles.nodeDot,
                hasArrived ? styles.activeDot : styles.pendingDot,
              ]}
            />
            <View>
              <Text style={styles.nodeTitle}>Llegada al destino</Text>
              <Text style={styles.nodeTime}>
                {hasArrived ? '08:45 AM' : 'Pendiente'}
              </Text>
            </View>
          </Animated.View>

        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  timelineBlock: {
    marginHorizontal: SPACING.xl,
    padding: 18,
    borderRadius: RADIUS.cards,
    backgroundColor: PALETTE.graphite,
    marginBottom: SPACING.xl,
  },

  sectionTitle: {
    ...FONT.h3,
    fontSize: 16,
    color: PALETTE.textPrimary,
    marginBottom: SPACING.md,
  },

  emptyText: {
    ...FONT.body,
    fontSize: 14,
    color: PALETTE.textMuted,
    fontStyle: 'italic',
  },

  timeline: {
    marginTop: SPACING.xs,
  },

  timelineNode: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },

  nodeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: SPACING.md,
    zIndex: 2,
  },

  startDot: {
    backgroundColor: PALETTE.mutedGold,
  },

  activeDot: {
    backgroundColor: PALETTE.successGreen,
  },

  pendingDot: {
    backgroundColor: PALETTE.carbonMist,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
  },

  nodeLine: {
    position: 'absolute',
    left: 5,
    top: 16,
    bottom: -20,
    width: 2,
    backgroundColor: PALETTE.steelLine,
    zIndex: 1,
  },

  nodeTitle: {
    ...FONT.bodyStrong,
    color: PALETTE.textPrimary,
  },

  nodeTime: {
    ...FONT.caption,
    color: PALETTE.textSecondary,
    marginTop: 2,
  },
});
