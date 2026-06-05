// src/components/modals/ExitDetectionModal.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Button } from '../ui/Button';

interface ExitDetectionModalProps {
  visible: boolean;
  exitTime: string;
  onContinueOperating: () => void;
  onCloseShift: () => void;
}

export function ExitDetectionModal({
  visible,
  exitTime,
  onContinueOperating,
  onCloseShift,
}: ExitDetectionModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onContinueOperating}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onContinueOperating} />

        <Animated.View entering={FadeInDown.duration(220)} style={styles.modalCard}>
          <View style={styles.alertHeader}>
            <View style={styles.iconWrapper}>
              <Ionicons
                name="warning"
                size={24}
                color={PALETTE.amberWarning}
              />
            </View>
            <Text style={styles.title}>Salida Detectada</Text>
          </View>

          <Text style={styles.subtitle}>
            El motor geo-fence detectó un abandono de la zona protegida a las{' '}
            <Text style={styles.timeHighlight}>{exitTime}</Text>. ¿Deseas mantener
            la sesión activa o cerrar la jornada laboral?
          </Text>

          <View style={styles.footer}>
            <Button
              label="Cerrar Jornada"
              variant="secondary"
              onPress={onCloseShift}
              style={{ flex: 1 }}
            />

            <Button
              label="Continuar"
              variant="primary"
              onPress={onContinueOperating}
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
    backgroundColor: 'rgba(242, 153, 74, 0.1)',
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

  timeHighlight: {
    ...FONT.bodyStrong,
    color: PALETTE.amberWarning,
  },

  footer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
});

