// src/components/ui/OperationalHeroCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { PALETTE, RADIUS, SPACING, FONT } from '../../constants/theme';
import { Button } from './Button';
import { StatusPill, PillStatus } from './StatusPill';

export type EngineState = 
  | 'NO_INICIADA'
  | 'ESPERANDO_LLEGADA'
  | 'ASINCRONIA_CHECKIN'
  | 'NO_SHOW'
  | 'EN_TRASLADO'
  | 'ACTIVA'
  | 'SALIDA_DETECTADA'
  | 'CERRADA';

interface OperationalHeroCardProps {
  state: EngineState;
  destination?: string;
  timeString: string;
  earnings: string;
  onPrimaryAction: () => void;
  onSecondaryAction?: () => void;
}

export function OperationalHeroCard({
  state,
  destination,
  timeString,
  earnings,
  onPrimaryAction,
  onSecondaryAction,
}: OperationalHeroCardProps) {
  
  const getStateConfig = () => {
    switch (state) {
      case 'NO_INICIADA': return { pillState: 'idle' as PillStatus, pillLabel: 'INACTIVO', primaryLabel: 'Iniciar Jornada', primaryVariant: 'primary' as const, secondaryLabel: null };
      case 'ESPERANDO_LLEGADA': return { pillState: 'pending' as PillStatus, pillLabel: 'ESPERANDO LLEGADA', primaryLabel: 'Forzar Llegada', primaryVariant: 'primary' as const, secondaryLabel: null };
      case 'ASINCRONIA_CHECKIN': return { pillState: 'warning' as PillStatus, pillLabel: 'ASINCRONÍA GPS', primaryLabel: 'Declarar Llegada', primaryVariant: 'danger' as const, secondaryLabel: 'Ver Detalles' };
      case 'NO_SHOW': return { pillState: 'error' as PillStatus, pillLabel: 'NO SHOW DETECTADO', primaryLabel: 'Forzar Inicio', primaryVariant: 'danger' as const, secondaryLabel: 'Abortar Sesión' };
      case 'EN_TRASLADO': return { pillState: 'active' as PillStatus, pillLabel: 'EN TRASLADO', primaryLabel: 'Confirmar Llegada', primaryVariant: 'primary' as const, secondaryLabel: null };
      case 'ACTIVA': return { pillState: 'active' as PillStatus, pillLabel: 'JORNADA ACTIVA', primaryLabel: 'Cerrar Jornada', primaryVariant: 'primary' as const, secondaryLabel: 'Añadir Nota' };
      case 'SALIDA_DETECTADA': return { pillState: 'warning' as PillStatus, pillLabel: 'SALIDA DETECTADA', primaryLabel: 'Resolver Alerta', primaryVariant: 'primary' as const, secondaryLabel: 'Cerrar Ahora' };
      case 'CERRADA': return { pillState: 'closed' as PillStatus, pillLabel: 'JORNADA CERRADA', primaryLabel: 'Nueva Jornada', primaryVariant: 'primary' as const, secondaryLabel: 'Ajustar Registro' };
      default: return { pillState: 'idle' as PillStatus, pillLabel: 'INACTIVO', primaryLabel: 'Iniciar', primaryVariant: 'primary' as const, secondaryLabel: null };
    }
  };

  const config = getStateConfig();

  return (
    <Animated.View 
      layout={LinearTransition.springify().damping(20).stiffness(200)} 
      style={styles.cardContainer}
    >
      <View style={styles.headerRow}>
        <StatusPill status={config.pillState} label={config.pillLabel} />
        {destination && (
          <Text style={styles.destinationText} numberOfLines={1} ellipsizeMode="tail">
            {destination}
          </Text>
        )}
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricBlock}>
          <Text style={styles.metricLabel}>Tiempo Transcurrido</Text>
          <Text style={styles.metricBigValue}>{timeString}</Text>
        </View>
        <View style={styles.metricBlockRight}>
          <Text style={styles.metricLabel}>Estimado Bruto</Text>
          <Text style={[styles.metricBigValue, { color: PALETTE.mutedGold }]}>{earnings}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <Button 
          label={config.primaryLabel} 
          variant={config.primaryVariant} 
          onPress={onPrimaryAction} 
          style={{ flex: 1 }} 
        />
        {config.secondaryLabel && onSecondaryAction && (
          <Button 
            label={config.secondaryLabel} 
            variant="secondary" 
            onPress={onSecondaryAction} 
            style={{ flex: 1 }} 
          />
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: SPACING.xl,
    backgroundColor: PALETTE.carbonMist,
    borderRadius: RADIUS.cards,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  destinationText: {
    ...FONT.bodyStrong,
    color: PALETTE.textPrimary,
    flex: 1,
    textAlign: 'right',
    marginLeft: SPACING.md,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  metricBlock: {
    flex: 1,
  },
  metricBlockRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  metricLabel: {
    ...FONT.caption,
    color: PALETTE.textSecondary,
    marginBottom: SPACING.xs,
  },
  metricBigValue: {
    fontSize: 40,
    fontWeight: '700',
    color: PALETTE.textPrimary,
    letterSpacing: -1,
  },
  actionRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
});

