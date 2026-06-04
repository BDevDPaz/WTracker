// src/components/ui/OperationalHeroCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { StatusPill } from './StatusPill';
import { Button } from './Button';

// Añadimos ASINCRONIA_CHECKIN y NO_SHOW a la Máquina de Estados (Resiliencia)
export type EngineState = 
  | 'NO_INICIADA' 
  | 'ESPERANDO_LLEGADA' 
  | 'ASINCRONIA_CHECKIN' // <--- NUEVO: Retraso de GPS
  | 'NO_SHOW'            // <--- NUEVO: Ausencia de llegada
  | 'EN_TRASLADO' 
  | 'ACTIVA' 
  | 'SALIDA_DETECTADA' 
  | 'CERRADA';

interface OperationalHeroCardProps {
  state: EngineState;
  destination?: string;
  timeString?: string;
  earnings?: string;
  onPrimaryAction: () => void;
  onSecondaryAction?: () => void;
}

export function OperationalHeroCard({
  state,
  destination = '---',
  timeString = '00:00',
  earnings = '$0.00',
  onPrimaryAction,
  onSecondaryAction,
}: OperationalHeroCardProps) {
  
  const getUIConfig = () => {
    switch (state) {
      case 'NO_INICIADA':
        return { pillStatus: 'idle' as const, pillLabel: 'No iniciada', subtext: 'Configura tu jornada', ctaPrimary: 'Iniciar jornada', ctaSecondary: null };
      case 'ESPERANDO_LLEGADA':
        return { pillStatus: 'pending' as const, pillLabel: 'Esperando llegada', subtext: 'Esperando detección del GPS', ctaPrimary: 'Ver monitoreo', ctaSecondary: 'Cancelar jornada' };
      
      // --- ESTADOS DE RESILIENCIA AÑADIDOS ---
      case 'ASINCRONIA_CHECKIN':
        return { pillStatus: 'warning' as const, pillLabel: 'Retraso de señal', subtext: '¿Ya estás en el destino?', ctaPrimary: 'Confirmar llegada', ctaSecondary: 'Esperar señal' };
      case 'NO_SHOW':
        return { pillStatus: 'error' as const, pillLabel: 'Fallo de detección', subtext: 'No se detectó llegada. ¿Deseas iniciar manualmente?', ctaPrimary: 'Iniciar manualmente', ctaSecondary: 'Cancelar jornada' };
      // ---------------------------------------

      case 'EN_TRASLADO':
        return { pillStatus: 'active' as const, pillLabel: 'En traslado', subtext: 'En camino al destino', ctaPrimary: 'Ver estado', ctaSecondary: 'Ajustar destino' };
      case 'ACTIVA':
        return { pillStatus: 'active' as const, pillLabel: 'Jornada activa', subtext: 'Sesión en curso', ctaPrimary: 'Cerrar jornada', ctaSecondary: 'Agregar nota' };
      case 'SALIDA_DETECTADA':
        return { pillStatus: 'warning' as const, pillLabel: 'Salida detectada', subtext: 'Saliste del área', ctaPrimary: 'Confirmar salida', ctaSecondary: 'Seguir trabajando' };
      case 'CERRADA':
        return { pillStatus: 'closed' as const, pillLabel: 'Jornada cerrada', subtext: 'Jornada finalizada', ctaPrimary: 'Revisar sesión', ctaSecondary: 'Ver historial' };
    }
  };

  const config = getUIConfig();

  return (
    <View style={[styles.cardContainer, (state === 'ASINCRONIA_CHECKIN' || state === 'SALIDA_DETECTADA') && styles.cardWarning, state === 'NO_SHOW' && styles.cardError]}>
      <View style={styles.topRow}><StatusPill status={config.pillStatus} label={config.pillLabel} /></View>
      <View style={styles.centerBox}>
        <Text style={styles.label}>DESTINO</Text>
        <Text style={styles.destinationTitle} numberOfLines={2}>{state === 'NO_INICIADA' ? 'Sin configurar' : destination}</Text>
        <Text style={[styles.contextText, (state === 'ASINCRONIA_CHECKIN' || state === 'SALIDA_DETECTADA') && { color: PALETTE.amberWarning }, state === 'NO_SHOW' && { color: PALETTE.deepRed }]}>{config.subtext}</Text>
      </View>
      <View style={styles.timeZone}>
        <Text style={styles.massiveTime}>{state === 'NO_INICIADA' ? '---' : timeString}</Text>
        <Text style={styles.secondaryInfo}>{state === 'NO_INICIADA' ? 'Ingreso: $0' : `Ingreso: ${earnings}`}</Text>
      </View>
      <View style={styles.footer}>
        <Button label={config.ctaPrimary} variant={state === 'NO_SHOW' ? 'danger' : 'primary'} onPress={onPrimaryAction} />
        {config.ctaSecondary && onSecondaryAction && (
          <Button label={config.ctaSecondary} variant="ghost" onPress={onSecondaryAction} style={{ marginTop: SPACING.sm }} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: { marginHorizontal: SPACING.xl, padding: 20, borderRadius: RADIUS.cards + 4, backgroundColor: PALETTE.carbonMist, minHeight: 220, borderWidth: 1, borderColor: 'transparent' },
  cardWarning: { borderColor: PALETTE.amberWarning }, // Borde de emergencia
  cardError: { borderColor: PALETTE.deepRed },       // Borde crítico
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.lg },
  centerBox: { marginBottom: SPACING.lg },
  label: { ...FONT.label, color: PALETTE.textSecondary, marginBottom: SPACING.xs },
  destinationTitle: { ...FONT.h3, color: PALETTE.textPrimary, marginBottom: 4 },
  contextText: { ...FONT.caption, color: PALETTE.mutedGold },
  timeZone: { marginBottom: SPACING.xl },
  massiveTime: { fontSize: 44, fontWeight: '700', color: PALETTE.textPrimary, letterSpacing: -1 },
  secondaryInfo: { ...FONT.body, color: PALETTE.textSecondary, marginTop: 4 },
  footer: { width: '100%', flexDirection: 'column' },
});

