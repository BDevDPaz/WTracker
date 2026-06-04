// src/components/modals/EditSessionModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Pressable, Platform, KeyboardAvoidingView } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Button } from '../ui/Button';

interface EditSessionModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export function EditSessionModal({ visible, onCancel, onSave }: EditSessionModalProps) {
  const [inTime, setInTime] = useState('04:56 PM');
  const [outTime, setOutTime] = useState('06:34 PM');
  const [note, setNote] = useState('');

  // Sincronización y reinicio preventivo de notas al conmutar visibilidad
  useEffect(() => {
    if (visible) {
      setNote('');
    }
  }, [visible]);

  // Detector algorítmico de inconsistencias o datos corruptos
  const isCorrupted = inTime.includes('??') || outTime.includes('??') || inTime === '' || outTime === '';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.overlay}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        
        {/* Tarjeta de ajuste con físicas de resorte */}
        <Animated.View 
          entering={SlideInDown.springify().damping(22).stiffness(250)} 
          style={styles.modalCard}
        >
          <Text style={styles.title}>Ajustar registro</Text>
          <Text style={styles.subtitle}>Modifica los horarios de la sesión seleccionada.</Text>

          {isCorrupted ? (
            <View style={styles.warningBanner}>
              <Ionicons name="warning" size={16} color={PALETTE.deepRed} />
              <Text style={styles.warningText}>El sistema detectó datos corruptos en el caché de la sesión. Ingresa horarios válidos.</Text>
            </View>
          ) : (
            inTime !== '04:56 PM' && (
              <View style={styles.infoBanner}>
                <Ionicons name="alert-circle" size={16} color={PALETTE.mutedGold} />
                <Text style={styles.infoText}>El cálculo total estimado de la sesión será recalculado en la base de datos.</Text>
              </View>
            )
          )}

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: SPACING.md }]}>
              <Text style={styles.label}>Entrada (HH:MM AM/PM)</Text>
              <TextInput 
                style={[styles.input, isCorrupted && styles.inputError]} 
                value={inTime} 
                onChangeText={setInTime} 
                placeholderTextColor={PALETTE.textMuted} 
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Salida (HH:MM AM/PM)</Text>
              <TextInput 
                style={[styles.input, isCorrupted && styles.inputError]} 
                value={outTime} 
                onChangeText={setOutTime} 
                placeholderTextColor={PALETTE.textMuted} 
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nota de ajuste (Obligatoria para auditoría)</Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Escribe el motivo del ajuste manual..." 
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
              label="Guardar" 
              variant="primary" 
              onPress={onSave} 
              style={{ flex: 1 }} 
              disabled={!note.trim() || isCorrupted} 
            />
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
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
    marginBottom: SPACING.lg 
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
    gap: SPACING.sm 
  },
  warningText: { 
    ...FONT.caption, 
    color: PALETTE.deepRed, 
    flex: 1 
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
    gap: SPACING.sm 
  },
  infoText: { 
    ...FONT.caption, 
    color: PALETTE.mutedGold, 
    flex: 1 
  },
  row: { 
    flexDirection: 'row', 
    marginBottom: SPACING.md 
  },
  inputGroup: { 
    marginBottom: SPACING.sm 
  },
  label: { 
    ...FONT.caption, 
    color: PALETTE.textSecondary, 
    marginBottom: 8 
  },
  input: { 
    backgroundColor: PALETTE.graphite, 
    borderRadius: RADIUS.inputs, 
    height: 52, 
    paddingHorizontal: SPACING.lg, 
    color: PALETTE.textPrimary, 
    ...FONT.body, 
    borderWidth: 1, 
    borderColor: PALETTE.steelLine 
  },
  inputError: { 
    borderColor: PALETTE.deepRed 
  },
  textArea: { 
    height: 90, 
    paddingTop: SPACING.md 
  },
  footer: { 
    flexDirection: 'row', 
    gap: SPACING.md, 
    marginTop: SPACING.md 
  },
});

