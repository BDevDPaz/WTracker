// src/components/modals/EditSessionModal.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Button } from '../ui/Button';
import { Ionicons } from '@expo/vector-icons';

interface EditSessionModalProps {
  visible: boolean;
  initialStart: string;
  initialEnd: string;
  onCancel: () => void;
  onConfirm: (newStart: string, newEnd: string, note: string) => void;
}

export function EditSessionModal({ visible, initialStart, initialEnd, onCancel, onConfirm }: EditSessionModalProps) {
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);
  const [note, setNote] = useState('');

  // Simulador de motor de validación: Detecta si hubo cambios
  const isTimeChanged = start !== initialStart || end !== initialEnd;
  
  // Simulador de solapamiento: Si pones "00:00" asume un choque (solo para testing visual)
  const isOverlapping = start === '00:00' || end === '00:00';

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
        <View style={styles.modalContent}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Ajustar registro</Text>
            <Text style={styles.subtitle}>Modifica los horarios de la sesión.</Text>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            
            {/* Banner de Solapamiento (Error Crítico) */}
            {isOverlapping && (
              <View style={[styles.banner, styles.bannerError]}>
                <Ionicons name="alert-circle" size={18} color={PALETTE.deepRed} />
                <Text style={[styles.bannerText, { color: PALETTE.deepRed }]}>
                  Este horario entra en conflicto con otra sesión.
                </Text>
              </View>
            )}

            {/* Banner de Recálculo (Advertencia) */}
            {isTimeChanged && !isOverlapping && (
              <View style={[styles.banner, styles.bannerWarning]}>
                <Ionicons name="warning" size={18} color={PALETTE.amberWarning} />
                <Text style={[styles.bannerText, { color: PALETTE.amberWarning }]}>
                  El total estimado de la sesión será actualizado.
                </Text>
              </View>
            )}

            {/* Inputs de Tiempo Simulado (En prod usarían DateTimePicker nativo) */}
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                <Text style={styles.inputLabel}>Entrada (HH:MM)</Text>
                <TextInput style={styles.input} value={start} onChangeText={setStart} placeholderTextColor={PALETTE.textMuted} />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Salida (HH:MM)</Text>
                <TextInput style={styles.input} value={end} onChangeText={setEnd} placeholderTextColor={PALETTE.textMuted} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nota de ajuste {isTimeChanged ? '(Obligatoria)' : '(Opcional)'}</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                value={note}
                onChangeText={setNote}
                placeholder="Ej. Olvidé hacer check-out al salir." 
                placeholderTextColor={PALETTE.textMuted}
                multiline
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.buttonWrapper}>
              <Button label="Cancelar" variant="ghost" onPress={onCancel} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button 
                label="Guardar ajuste" 
                variant="primary" 
                onPress={() => onConfirm(start, end, note)} 
                disabled={isOverlapping || (isTimeChanged && note.trim() === '')}
              />
            </View>
          </View>
          
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: PALETTE.carbonMist, borderTopLeftRadius: RADIUS.modals, borderTopRightRadius: RADIUS.modals, padding: SPACING.xl, paddingBottom: 40, maxHeight: '90%' },
  header: { marginBottom: SPACING.lg },
  title: { ...FONT.h2, color: PALETTE.textPrimary, marginBottom: 4 },
  subtitle: { ...FONT.body, color: PALETTE.textSecondary },
  body: { marginBottom: SPACING.xl },
  banner: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md, borderRadius: RADIUS.inputs, marginBottom: SPACING.lg, gap: 8 },
  bannerError: { backgroundColor: 'rgba(198, 40, 40, 0.1)', borderWidth: 1, borderColor: PALETTE.deepRed },
  bannerWarning: { backgroundColor: 'rgba(245, 124, 0, 0.1)', borderWidth: 1, borderColor: PALETTE.amberWarning },
  bannerText: { ...FONT.caption, fontWeight: '600', flex: 1 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between' },
  inputGroup: { marginBottom: SPACING.lg },
  inputLabel: { ...FONT.caption, color: PALETTE.textSecondary, marginBottom: 8 },
  input: { backgroundColor: PALETTE.graphite, borderRadius: RADIUS.inputs, height: 52, paddingHorizontal: SPACING.lg, color: PALETTE.textPrimary, ...FONT.body, borderWidth: 1, borderColor: PALETTE.steelLine },
  textArea: { height: 100, paddingTop: 16, textAlignVertical: 'top' },
  footer: { flexDirection: 'row', gap: SPACING.md },
  buttonWrapper: { flex: 1 },
});

