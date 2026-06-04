// src/components/modals/DeleteSessionModal.tsx
import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Button } from '../ui/Button';
import { Ionicons } from '@expo/vector-icons';

interface DeleteSessionModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteSessionModal({ visible, onCancel, onConfirm }: DeleteSessionModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          
          <View style={styles.iconCircle}>
            <Ionicons name="trash" size={32} color={PALETTE.deepRed} />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Eliminar registro</Text>
            <Text style={styles.subtitle}>
              ¿Deseas eliminar esta sesión? Esta acción no se puede deshacer.
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.buttonWrapper}>
              <Button label="Cancelar" variant="ghost" onPress={onCancel} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button label="Eliminar" variant="danger" onPress={onConfirm} />
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
    backgroundColor: PALETTE.carbonMist, // Level 2 Surface
    borderRadius: RADIUS.modals,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: PALETTE.deepRed, // Borde de peligro
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(198, 40, 40, 0.1)', // deepRed con opacidad
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    alignSelf: 'center',
  },
  header: { marginBottom: SPACING.xl, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '700', color: PALETTE.textPrimary, marginBottom: 8, textAlign: 'center' },
  subtitle: { ...FONT.body, color: PALETTE.textSecondary, textAlign: 'center', lineHeight: 22 },
  footer: { flexDirection: 'row', gap: SPACING.md },
  buttonWrapper: { flex: 1 },
});

