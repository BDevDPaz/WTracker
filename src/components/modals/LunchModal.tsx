// src/components/modals/LunchModal.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Button } from '../ui/Button';

interface LunchModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (lunchMinutes: number) => void;
}

const LUNCH_OPTIONS = [0, 30, 45, 60];

export function LunchModal({ visible, onCancel, onConfirm }: LunchModalProps) {
  const [selectedLunch, setSelectedLunch] = useState<number>(30); // Default: 30 min

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Confirmar cierre</Text>
            <Text style={styles.subtitle}>Selecciona el tiempo de almuerzo a deducir de esta sesión.</Text>
          </View>

          {/* Cuerpo (Selector rápido de tiempo)[span_8](start_span)[span_8](end_span) */}
          <View style={styles.body}>
            <View style={styles.optionsRow}>
              {LUNCH_OPTIONS.map((min) => {
                const isActive = selectedLunch === min;
                return (
                  <Pressable
                    key={min}
                    style={[styles.lunchPill, isActive && styles.lunchPillActive]}
                    onPress={() => setSelectedLunch(min)}
                  >
                    <Text style={[styles.lunchPillText, isActive && styles.lunchPillTextActive]}>
                      {min} m
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.buttonWrapper}>
              <Button label="Volver" variant="ghost" onPress={onCancel} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button label="Cerrar jornada" variant="primary" onPress={() => onConfirm(selectedLunch)} />
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
    borderColor: PALETTE.steelLine,
  },
  header: { marginBottom: SPACING.xl },
  title: { ...FONT.h2, color: PALETTE.textPrimary, marginBottom: 4 },
  subtitle: { ...FONT.body, color: PALETTE.textSecondary, lineHeight: 22 },
  body: { marginBottom: SPACING.xxl },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: SPACING.sm },
  lunchPill: {
    flex: 1,
    height: 48,
    backgroundColor: PALETTE.graphite,
    borderRadius: RADIUS.inputs,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
  },
  lunchPillActive: {
    backgroundColor: 'rgba(197, 160, 89, 0.15)', // mutedGold con opacidad
    borderColor: PALETTE.mutedGold,
  },
  lunchPillText: { ...FONT.bodyStrong, color: PALETTE.textSecondary },
  lunchPillTextActive: { color: PALETTE.mutedGold },
  footer: { flexDirection: 'row', gap: SPACING.md },
  buttonWrapper: { flex: 1 },
});

