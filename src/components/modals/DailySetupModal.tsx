// src/components/modals/DailySetupModal.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { PALETTE, RADIUS, FONT, SPACING } from '../../constants/theme';
import { Button } from '../ui/Button';

interface DailySetupModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (destination: string, alias: string) => void;
}

export function DailySetupModal({ visible, onCancel, onConfirm }: DailySetupModalProps) {
  const [destination, setDestination] = useState('');
  const [alias, setAlias] = useState('');

  const handleConfirm = () => {
    onConfirm(destination, alias);
    setDestination('');
    setAlias('');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.modalContent}>
          
          {/* Encabezado */}
          <View style={styles.header}>
            <Text style={styles.title}>Iniciar jornada</Text>
            <Text style={styles.subtitle}>Configura el destino operativo</Text>
          </View>

          {/* Cuerpo (Inputs) */}
          <View style={styles.body}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Destino / Dirección</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Ej. 10101 Lindley Ave" 
                placeholderTextColor={PALETTE.textMuted}
                value={destination}
                onChangeText={setDestination}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Alias / Cliente (Opcional)</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Ej. Proyecto Norte" 
                placeholderTextColor={PALETTE.textMuted}
                value={alias}
                onChangeText={setAlias}
              />
            </View>
          </View>

          {/* Footer (Secondary Left, Primary Right) */}
          <View style={styles.footer}>
            <View style={styles.buttonWrapper}>
              <Button label="Cancelar" variant="ghost" onPress={onCancel} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button 
                label="Activar monitoreo" 
                variant="primary" 
                onPress={handleConfirm} 
                disabled={destination.trim().length === 0} 
              />
            </View>
          </View>
          
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)', // Overlay crítico oscuro[span_4](start_span)[span_4](end_span)
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  modalContent: {
    backgroundColor: PALETTE.carbonMist, // Level 2 Surface[span_5](start_span)[span_5](end_span)
    borderRadius: RADIUS.modals, // 28px[span_6](start_span)[span_6](end_span)
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
  },
  header: { marginBottom: SPACING.xl },
  title: { ...FONT.h2, color: PALETTE.textPrimary, marginBottom: 4 },
  subtitle: { ...FONT.body, color: PALETTE.textSecondary },
  body: { marginBottom: SPACING.xl },
  inputGroup: { marginBottom: SPACING.lg },
  inputLabel: { ...FONT.caption, color: PALETTE.textSecondary, marginBottom: 8 },
  input: {
    backgroundColor: PALETTE.graphite, // Level 1 Surface
    borderRadius: RADIUS.inputs,
    height: 52,
    paddingHorizontal: SPACING.lg,
    color: PALETTE.textPrimary,
    ...FONT.body,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
  },
  footer: { flexDirection: 'row', gap: SPACING.md },
  buttonWrapper: { flex: 1 },
});

