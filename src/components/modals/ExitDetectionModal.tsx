// src/components/modals/ExitDetectionModal.tsx
import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Button } from '../ui/Button';
import { Ionicons } from '@expo/vector-icons';

interface ExitDetectionModalProps {
  visible: boolean;
  exitTime: string;
  onContinueOperating: () => void;
  onCloseShift: () => void;
}

export function ExitDetectionModal({ visible, exitTime, onContinueOperating, onCloseShift }: ExitDetectionModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          
          <View style={styles.iconCircle}>
            <Ionicons name="warning" size={32} color={PALETTE.amberWarning} />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Salida detectada</Text>
            <Text style={styles.subtitle}>
              El sistema registró una salida de la zona activa a las {exitTime}. ¿Deseas cerrar tu jornada ahora?
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.buttonWrapper}>
              {/* Acción Secundaria Fuerte: Sigo en operación[span_10](start_span)[span_10](end_span) */}
              <Button label="Sigo en operación" variant="ghost" onPress={onContinueOperating} />
            </View>
            <View style={styles.buttonWrapper}>
              {/* Acción Primaria Destructiva: Cerrar ahora[span_11](start_span)[span_11](end_span) */}
              <Button label="Cerrar ahora" variant="danger" onPress={onCloseShift} />
            </View>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  modalContent: {
    backgroundColor: PALETTE.carbonMist,
    borderRadius: RADIUS.modals,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: PALETTE.amberWarning, // Borde de advertencia para este caso crítico
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(245, 124, 0, 0.1)', // amberWarning opaco
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    alignSelf: 'center',
  },
  header: { marginBottom: SPACING.xl, alignItems: 'center' },
  title: { ...FONT.h2, color: PALETTE.textPrimary, marginBottom: 8, textAlign: 'center' },
  subtitle: { ...FONT.body, color: PALETTE.textSecondary, textAlign: 'center', lineHeight: 22 },
  footer: { flexDirection: 'column', gap: SPACING.md }, // Stack vertical por la longitud del texto
  buttonWrapper: { width: '100%' },
});

