// src/components/modals/LunchModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Button } from '../ui/Button';

interface LunchModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (minutes: number) => void;
}

export function LunchModal({ visible, onCancel, onConfirm }: LunchModalProps) {
  const [selected, setSelected] = useState(30);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        {/* Fondo táctil para desestimar el modal de forma segura */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        
        {/* Tarjeta interactiva con físicas de resorte */}
        <Animated.View 
          entering={SlideInDown.springify().damping(22).stiffness(250)} 
          style={styles.modalCard}
        >
          <Text style={styles.title}>Deducción de Almuerzo</Text>
          <Text style={styles.subtitle}>Selecciona el tiempo de descanso a descontar de la jornada actual.</Text>

          {/* Fila de opciones de tiempo */}
          <View style={styles.optionsRow}>
            {[0, 30, 45, 60].map(min => (
              <Pressable 
                key={min} 
                onPress={() => setSelected(min)} 
                style={[styles.optionPill, selected === min && styles.optionPillActive]}
              >
                <Text style={[styles.optionText, selected === min && styles.optionTextActive]}>
                  {min}m
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Acciones del pie de página */}
          <View style={styles.footer}>
            <Button 
              label="Omitir" 
              variant="ghost" 
              onPress={onCancel} 
              style={{ flex: 1 }} 
            />
            <Button 
              label="Confirmar" 
              variant="primary" 
              onConfirm={() => onConfirm(selected)} 
              onPress={() => onConfirm(selected)} 
              style={{ flex: 1 }} 
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'flex-end' 
  },
  modalCard: { 
    backgroundColor: PALETTE.carbonMist, 
    borderTopLeftRadius: RADIUS.cards, 
    borderTopRightRadius: RADIUS.cards, 
    padding: SPACING.xl, 
    paddingBottom: Platform.OS === 'ios' ? 40 : SPACING.xl, 
    borderWidth: 1, 
    borderColor: PALETTE.steelLine, 
    borderBottomWidth: 0 
  },
  title: { 
    ...FONT.h2, 
    color: PALETTE.textPrimary, 
    marginBottom: SPACING.xs 
  },
  subtitle: { 
    ...FONT.body, 
    color: PALETTE.textSecondary, 
    marginBottom: SPACING.xl,
    lineHeight: 22 
  },
  optionsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: SPACING.xl 
  },
  optionPill: { 
    flex: 1, 
    marginHorizontal: 4, 
    paddingVertical: 14, 
    alignItems: 'center', 
    backgroundColor: PALETTE.graphite, 
    borderRadius: RADIUS.inputs, 
    borderWidth: 1, 
    borderColor: PALETTE.steelLine 
  },
  optionPillActive: { 
    backgroundColor: 'rgba(212, 175, 55, 0.1)', 
    borderColor: PALETTE.mutedGold 
  },
  optionText: { 
    ...FONT.bodyStrong, 
    color: PALETTE.textSecondary 
  },
  optionTextActive: { 
    color: PALETTE.mutedGold 
  },
  footer: { 
    flexDirection: 'row', 
    gap: SPACING.md 
  },
});

