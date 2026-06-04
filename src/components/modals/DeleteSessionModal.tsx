// src/components/modals/DeleteSessionModal.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Button } from '../ui/Button';

interface DeleteSessionModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteSessionModal({ visible, onCancel, onConfirm }: DeleteSessionModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        {/* Fondo táctil seguro para descartar la acción destructiva */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />

        {/* Tarjeta de confirmación con físicas de resorte */}
        <Animated.View
          entering={SlideInDown.springify().damping(22).stiffness(250)}
          style={styles.modalCard}
        >
          <View style={styles.alertHeader}>
            <View style={styles.iconWrapper}>
              <Ionicons name="trash-bin" size={24} color={PALETTE.deepRed} />
            </View>
            <Text style={styles.title}>Eliminar Registro</Text>
          </View>

          <Text style={styles.subtitle}>
            Esta acción es completamente irreversible y destructiva. Se borrarán permanentemente de la base de datos local todos los eventos de geolocalización, marcas de tiempo y cálculos financieros de esta sesión.
          </Text>

          <View style={styles.footer}>
            <Button
              label="Cancelar"
              variant="ghost"
              onPress={onCancel}
              style={{ flex: 1 }}
            />
            <Button
              label="Eliminar"
              variant="danger"
              onPress={onConfirm}
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
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: PALETTE.carbonMist,
    borderTopLeftRadius: RADIUS.cards,
    borderTopRightRadius: RADIUS.cards,
    padding: SPACING.xl,
    paddingBottom: Platform.OS === 'ios' ? 40 : SPACING.xl,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
    borderBottomWidth: 0,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(235, 87, 87, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...FONT.h2,
    color: PALETTE.textPrimary,
  },
  subtitle: {
    ...FONT.body,
    color: PALETTE.textSecondary,
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
});

