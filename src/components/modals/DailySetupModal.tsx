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
import { Ionicons } from '@expo/vector-icons';
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

  useEffect(() => {
    if (visible) {
      setDest('');
      setAddr('');
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />

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
            <View style={styles.headerRow}>
              <Ionicons name="play-circle-outline" size={22} color={PALETTE.mutedGold} />
              <Text style={styles.title}>Iniciar jornada</Text>
            </View>

            <Text style={styles.subtitle}>
              Ingresa el destino donde comenzarás la jornada.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Destino</Text>

              <View style={styles.inputRow}>
                <Ionicons name="location-outline" size={16} color={PALETTE.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Ej. Taller central"
                  placeholderTextColor={PALETTE.textMuted}
                  value={dest}
                  onChangeText={setDest}
                  autoFocus
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dirección (opcional)</Text>

              <View style={styles.inputRow}>
                <Ionicons name="map-outline" size={16} color={PALETTE.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Ej. 123 Main St"
                  placeholderTextColor={PALETTE.textMuted}
                  value={addr}
                  onChangeText={setAddr}
                />
              </View>
            </View>

            <View style={styles.footer}>
              <Button
                label="Cancelar"
                variant="ghost"
                onPress={onCancel}
                style={{ flex: 1 }}
              />

              <Button
                label="Iniciar jornada"
                variant="primary"
                onPress={() => onConfirm(dest || 'Destino no especificado', addr)}
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

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: SPACING.xs,
  },

  title: {
    ...FONT.h2,
    color: PALETTE.textPrimary,
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

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: PALETTE.graphite,
    borderRadius: RADIUS.inputs,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
    paddingHorizontal: SPACING.md,
  },

  input: {
    flex: 1,
    height: 52,
    color: PALETTE.textPrimary,
    ...FONT.body,
  },

  footer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
});
