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
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Button } from '../ui/Button';

interface EditSessionModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export function EditSessionModal({
  visible,
  onCancel,
  onSave,
}: EditSessionModalProps) {
  const [inTime, setInTime] = useState('04:56 PM');
  const [outTime, setOutTime] = useState('06:34 PM');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (visible) {
      setNote('');
    }
  }, [visible]);

  const isCorrupted =
    inTime.includes('??') ||
    outTime.includes('??') ||
    inTime === '' ||
    outTime === '';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          enableAutomaticScroll={false}
          extraScrollHeight={Platform.OS === 'ios' ? 20 : 40}
        >
          <Animated.View
            entering={FadeInDown.duration(220)}
            style={styles.modalCard}
          >
            <View style={styles.headerRow}>
              <Ionicons name="create-outline" size={20} color={PALETTE.mutedGold} />
              <Text style={styles.title}>Editar jornada</Text>
            </View>

            <Text style={styles.subtitle}>
              Ajusta los horarios registrados de esta jornada.
            </Text>

            {isCorrupted ? (
              <View style={styles.warningBanner}>
                <Ionicons name="warning-outline" size={16} color={PALETTE.deepRed} />
                <Text style={styles.warningText}>
                  Se detectaron datos inválidos. Ingresa horarios correctos.
                </Text>
              </View>
            ) : (
              inTime !== '04:56 PM' && (
                <View style={styles.infoBanner}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={16}
                    color={PALETTE.mutedGold}
                  />
                  <Text style={styles.infoText}>
                    El cálculo de la jornada será actualizado.
                  </Text>
                </View>
              )
            )}

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.leftColumn]}>
                <Text style={styles.label}>Hora de inicio</Text>
                <TextInput
                  style={[styles.input, isCorrupted && styles.inputError]}
                  value={inTime}
                  onChangeText={setInTime}
                  placeholder="08:00 AM"
                  placeholderTextColor={PALETTE.textMuted}
                />
              </View>

              <View style={[styles.inputGroup, styles.rightColumn]}>
                <Text style={styles.label}>Hora de fin</Text>
                <TextInput
                  style={[styles.input, isCorrupted && styles.inputError]}
                  value={outTime}
                  onChangeText={setOutTime}
                  placeholder="05:00 PM"
                  placeholderTextColor={PALETTE.textMuted}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Motivo del ajuste</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe el motivo del cambio..."
                placeholderTextColor={PALETTE.textMuted}
                value={note}
                onChangeText={setNote}
                multiline
                textAlignVertical="top"
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
                label="Guardar cambios"
                variant="primary"
                onPress={onSave}
                style={{ flex: 1 }}
                disabled={!note.trim() || isCorrupted}
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
    marginBottom: SPACING.lg,
  },

  warningBanner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(235, 87, 87, 0.1)',
    padding: SPACING.md,
    borderRadius: RADIUS.inputs,
    borderWidth: 1,
    borderColor: PALETTE.deepRed,
    marginBottom: SPACING.lg,
    alignItems: 'center',
    gap: SPACING.sm,
  },

  warningText: {
    ...FONT.caption,
    color: PALETTE.deepRed,
    flex: 1,
  },

  infoBanner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    padding: SPACING.md,
    borderRadius: RADIUS.inputs,
    borderWidth: 1,
    borderColor: PALETTE.mutedGold,
    marginBottom: SPACING.lg,
    alignItems: 'center',
    gap: SPACING.sm,
  },

  infoText: {
    ...FONT.caption,
    color: PALETTE.mutedGold,
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },

  inputGroup: {
    marginBottom: SPACING.sm,
  },

  leftColumn: {
    flex: 1,
    marginRight: SPACING.md,
  },

  rightColumn: {
    flex: 1,
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

  inputError: {
    borderColor: PALETTE.deepRed,
  },

  textArea: {
    height: 90,
    paddingTop: SPACING.md,
  },

  footer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
});
