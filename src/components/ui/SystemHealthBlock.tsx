// src/components/ui/SystemHealthBlock.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, FadeInDown } from 'react-native-reanimated';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { EngineState } from './OperationalHeroCard';

interface SystemHealthBlockProps {
  engineState: EngineState;
}

export function SystemHealthBlock({ engineState }: SystemHealthBlockProps) {
  const isTracking = ['ESPERANDO_LLEGADA', 'EN_TRASLADO', 'ACTIVA'].includes(engineState);
  const isError = ['ASINCRONIA_CHECKIN', 'NO_SHOW', 'SALIDA_DETECTADA'].includes(engineState);
  
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

  const gpsColor = isError ? PALETTE.deepRed : (isTracking ? PALETTE.successGreen : PALETTE.textMuted);
  const syncColor = isError ? PALETTE.amberWarning : PALETTE.successGreen;

  return (
    <Animated.View entering={FadeInDown.delay(200).springify().damping(20)} style={styles.block}>
      <Text style={styles.title}>Salud del Sistema</Text>
      
      <View style={styles.row}>
        <Animated.View style={[styles.dot, { backgroundColor: gpsColor }, animatedDotStyle]} />
        <Text style={styles.text}>
          {isTracking ? 'GPS Activo (Alta precisión)' : (isError ? 'Interrupción de señal GPS' : 'GPS Inactivo')}
        </Text>
      </View>
      
      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: syncColor }]} />
        <Text style={styles.text}>
          {isError ? 'Pendiente de sincronización' : 'Sincronización en tiempo real'}
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
    borderColor: PALETTE.steelLine
  },
  title: { 
    ...FONT.h3, 
    fontSize: 16, 
    color: PALETTE.textPrimary, 
    marginBottom: SPACING.md 
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: SPACING.sm 
  },
  dot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    marginRight: SPACING.md 
  },
  text: { 
    ...FONT.body, 
    color: PALETTE.textSecondary,
    fontSize: 14 
  },
});

