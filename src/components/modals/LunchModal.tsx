import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Button } from '../ui/Button';

interface LunchModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (minutes: number) => void;
}

export function LunchModal({ visible, onCancel, onConfirm }: LunchModalProps) {
  const [selected, setSelected] = useState(30);

  useEffect(() => {
    if (visible) {
      setSelected(30);
    }
  }, [visible]);

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

        <Animated.View entering={FadeInDown.duration(220)} style={styles.modalCard}>
          
          <View style={styles.headerRow}>
            <Ionicons name="restaurant-outline" size={22} color={PALETTE.mutedGold} />
            <Text style={styles.title}>Tiempo de descanso</Text>
          </View>

          <Text style={styles.subtitle}>
            Selecciona el tiempo que se descontará de la jornada.
          </Text>

          <View style={styles.optionsRow}>
            {[0, 30, 45, 60].map((min) => (
              <Pressable
                key={min}
                onPress={() => setSelected(min)}
                style={[
                  styles.optionPill,
                  selected === min && styles.optionPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    selected === min && styles.optionTextActive,
                  ]}
                >
                  {min} min
                </Text>
              </Pressable>
            ))}
          </View>

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
    lineHeight: 22,
  },

  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },

  optionPill: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: PALETTE.graphite,
    borderRadius: RADIUS.inputs,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
  },

  optionPillActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderColor: PALETTE.mutedGold,
  },

  optionText: {
    ...FONT.bodyStrong,
    color: PALETTE.textSecondary,
  },

  optionTextActive: {
    color: PALETTE.mutedGold,
  },

  footer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
});
