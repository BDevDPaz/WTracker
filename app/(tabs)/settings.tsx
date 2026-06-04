// app/(tabs)/settings.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, Platform, Switch } from 'react-native';
import { PALETTE, SPACING, RADIUS, FONT } from '../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../src/components/ui/Button';
import { useToast } from '../../src/context/ToastContext';

export default function SettingsScreen() {
  const { showToast } = useToast();

  // --- Estados de Formulario ---
  const [isDirty, setIsDirty] = useState(false); // Detecta si hay cambios sin guardar
  const [remindersOn, setRemindersOn] = useState(true);
  const [alertsOn, setAlertsOn] = useState(true);

  // --- Estados de Seguridad (SecureBlock) ---
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // --- Simulador de Edge-Case (Revocación del SO) ---
  const [hasPermissions, setHasPermissions] = useState(true);

  // Función para encender el botón de "Guardar"
  const markAsDirty = () => setIsDirty(true);

  // 1. Happy Path & Error: Manejo del PIN
  const handleUnlock = () => {
    if (pin === '1234') {
      setIsUnlocked(true);
      setPinError(false);
      showToast('Zona administrativa desbloqueada', 'success');
    } else {
      setPinError(true);
      showToast('PIN incorrecto. Acceso denegado.', 'info');
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPin('');
    showToast('Zona administrativa bloqueada de forma segura', 'info');
  };

  // 2. Happy Path & Error: Persistencia de datos
  const handleSave = () => {
    if (!hasPermissions) {
      showToast('Error: Se requieren permisos de GPS para operar', 'info');
      return;
    }
    setIsDirty(false);
    showToast('Configuración guardada exitosamente', 'success');
  };

  // 3. Edge Case: Simulador de Revocación de GPS
  const togglePermissionsSimulator = () => {
    const newState = !hasPermissions;
    setHasPermissions(newState);
    if (newState) {
      showToast('Sistema: Permisos de ubicación restaurados', 'success');
    } else {
      showToast('CRÍTICO: El SO revocó los permisos en segundo plano', 'info');
      markAsDirty(); // Forzamos el render para ver el botón guardado bloqueado
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ajustes</Text>
        <Text style={styles.headerSubtitle}>CONFIGURACIÓN Y SEGURIDAD</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Bloque: Perfil Laboral (Siempre editable) */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Perfil Laboral</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre</Text>
            <TextInput style={styles.input} defaultValue="Alex León" onChangeText={markAsDirty} placeholderTextColor={PALETTE.textMuted} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tarifa por hora ($)</Text>
            <TextInput style={styles.input} defaultValue="20.00" keyboardType="numeric" onChangeText={markAsDirty} placeholderTextColor={PALETTE.textMuted} />
          </View>
        </View>

        {/* Bloque: Parámetros de Jornada (Protegido por SecureBlock) */}
        <View style={[styles.card, !isUnlocked && styles.cardLocked]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg }}>
            <Text style={styles.sectionTitle}>Parámetros de Jornada</Text>
            {!isUnlocked && <Ionicons name="lock-closed" size={16} color={PALETTE.mutedGold} />}
          </View>
          
          <View style={{ flexDirection: 'row', gap: SPACING.md }}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Hora base</Text>
              <TextInput style={[styles.input, !isUnlocked && styles.inputDisabled]} defaultValue="06:00" editable={isUnlocked} onChangeText={markAsDirty} />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Mult. Overtime</Text>
              <TextInput style={[styles.input, !isUnlocked && styles.inputDisabled]} defaultValue="1.5" editable={isUnlocked} onChangeText={markAsDirty} />
            </View>
          </View>
        </View>

        {/* Bloque: Monitoreo y Ubicación (Con Simulador Oculto) */}
        <View style={[styles.card, !hasPermissions && { borderColor: PALETTE.deepRed, borderWidth: 1 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg }}>
            <Text style={styles.sectionTitle}>Monitoreo y Ubicación</Text>
            {/* BOTÓN OCULTO PARA SIMULAR FALLO DE GPS */}
            <Pressable onPress={togglePermissionsSimulator}>
              <Text style={{ ...FONT.label, color: PALETTE.mutedGold }}>Simular SO</Text>
            </Pressable>
          </View>
          
          <View style={styles.healthRow}>
            <View style={[styles.healthDot, { backgroundColor: hasPermissions ? PALETTE.successGreen : PALETTE.deepRed }]} />
            <Text style={[styles.healthText, !hasPermissions && { color: PALETTE.deepRed }]}>
              {hasPermissions ? 'Permiso de ubicación activo' : 'Permiso de ubicación REVOCADO'}
            </Text>
          </View>
          <View style={styles.healthRow}>
            <View style={[styles.healthDot, { backgroundColor: hasPermissions ? PALETTE.successGreen : PALETTE.deepRed }]} />
            <Text style={[styles.healthText, !hasPermissions && { color: PALETTE.deepRed }]}>
              {hasPermissions ? 'Ubicación en segundo plano activa' : 'Ubicación bloqueada por sistema'}
            </Text>
          </View>
        </View>

        {/* Bloque: Zona Administrativa (SecureBlock UI) */}
        <View style={[styles.card, { borderColor: isUnlocked ? PALETTE.successGreen : PALETTE.steelLine, borderWidth: 1 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Ionicons name={isUnlocked ? "lock-open" : "lock-closed"} size={20} color={isUnlocked ? PALETTE.successGreen : PALETTE.mutedGold} />
            <Text style={[styles.sectionTitle, { marginBottom: 0, color: isUnlocked ? PALETTE.successGreen : PALETTE.mutedGold }]}>
              Zona Administrativa
            </Text>
          </View>
          <Text style={{ ...FONT.body, color: PALETTE.textSecondary, marginBottom: SPACING.lg }}>
            {isUnlocked ? 'Acceso concedido. Parámetros desbloqueados.' : 'Esta sección requiere acceso protegido.'}
          </Text>

          {!isUnlocked ? (
            <View style={{ gap: SPACING.md }}>
              <TextInput 
                style={[styles.input, pinError && { borderColor: PALETTE.deepRed, borderWidth: 1 }]} 
                placeholder="Ingresa tu PIN (1234)" 
                placeholderTextColor={PALETTE.textMuted} 
                keyboardType="numeric" 
                secureTextEntry 
                value={pin}
                onChangeText={(t) => { setPin(t); setPinError(false); }}
              />
              <Button label="Desbloquear" variant="ghost" onPress={handleUnlock} />
            </View>
          ) : (
            <Button label="Bloquear panel" variant="secondary" onPress={handleLock} />
          )}
        </View>
        
        {/* Espacio para que el scroll no choque con el botón flotante */}
        <View style={{ height: 100 }} />

      </ScrollView>

      {/* Action Footer Flotante */}
      <View style={styles.actionFooter}>
        <Button 
          label="Guardar cambios" 
          variant="primary" 
          onPress={handleSave} 
          disabled={!isDirty || !hasPermissions} 
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: PALETTE.obsidian },
  header: { marginHorizontal: SPACING.xl, marginTop: SPACING.sm, marginBottom: SPACING.xl },
  headerTitle: { fontSize: 28, fontWeight: '700', color: PALETTE.textPrimary },
  headerSubtitle: { fontSize: 11, fontWeight: '600', letterSpacing: 2, color: PALETTE.textSecondary, marginTop: 2 },
  scrollContent: { paddingHorizontal: SPACING.xl },
  
  card: { padding: SPACING.lg, borderRadius: RADIUS.cards, backgroundColor: PALETTE.carbonMist, marginBottom: SPACING.lg },
  cardLocked: { opacity: 0.7 },
  sectionTitle: { ...FONT.h3, fontSize: 18, color: PALETTE.textPrimary, marginBottom: SPACING.lg },
  
  inputGroup: { marginBottom: SPACING.md },
  inputLabel: { ...FONT.caption, color: PALETTE.textSecondary, marginBottom: 8 },
  input: { backgroundColor: PALETTE.graphite, borderRadius: RADIUS.inputs, height: 52, paddingHorizontal: SPACING.lg, color: PALETTE.textPrimary, ...FONT.body },
  inputDisabled: { color: PALETTE.textMuted },
  
  healthRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md },
  healthDot: { width: 8, height: 8, borderRadius: 4, marginRight: SPACING.sm },
  healthText: { ...FONT.body, fontSize: 14, color: PALETTE.textSecondary },

  actionFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: SPACING.xl, paddingBottom: Platform.OS === 'ios' ? 40 : SPACING.xl, backgroundColor: PALETTE.obsidian, borderTopWidth: 1, borderTopColor: PALETTE.steelLine },
});

