// src/components/modals/DailySetupModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Button } from '../ui/Button';

interface DailySetupModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (destination: string, address?: string) => void;
}

export function DailySetupModal({
  visible,
  onCancel,
  onConfirm,
}: DailySetupModalProps) {
  const [dest, setDest] = useState('');
  const [addr, setAddr] = useState('');

  // Limpieza del estado al abrir
  useEffect(() => {
    if (visible) {
      setDest('');
      setAddr('');
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        {/* Fondo táctil */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />

        {/* Contenedor dinámico para teclado */}
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === 'ios' ? 20 : 40}
        >
          <Animated.View
            entering={SlideInDown.springify().damping(22).stiffness(250)}
            style={styles.modalCard}
          >
            <Text style={styles.title}>Iniciar Jornada</Text>
            <Text style={styles.subtitle}>
              Confirma tu destino para el rastreo de zona.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Destino / Cliente</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. Taller Central"
                placeholderTextColor={PALETTE.textMuted}
                value={dest}
                onChangeText={setDest}
                autoFocus
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dirección (Opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 123 Main St"
                placeholderTextColor={PALETTE.textMuted}
                value={addr}
                onChangeText={setAddr}
              />
            </View>

            <View style={styles.footer}>
              <Button
                label="Cancelar"
                variant="ghost"
                onPress={onCancel}
                style={{ flex: 1 }}
              />

              <Button
                label="Iniciar"
                variant="primary"
                onPress={() => onConfirm(dest || 'Sin nombre', addr)}
                style={{ flex: 1 }}
                disabled={!dest.trim()}
              />
            </View>
          </Animated.View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  scrollContainer: {
    flexGrow: 1,
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

  title: {
    ...FONT.h2,
    color: PALETTE.textPrimary,
    marginBottom: SPACING.xs,
  },

  subtitle: {
    ...FONT.body,
    color: PALETTE.textSecondary,
    marginBottom: SPACING.xl,
  },

  inputGroup: {
    marginBottom: SPACING.lg,
  },

  label: {
    ...FONT.caption,
    color: PALETTE.textSecondary,
    marginBottom: 8,
  },

  input: {
    backgroundColor: PALETTE.graphite,
    borderRadius: RADIUS.inputs,
    height: 52,
    paddingHorizontal: SPACING.lg,
    color: PALETTE.textPrimary,
    ...FONT.body,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
  },

  footer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
});

