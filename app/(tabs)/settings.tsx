// app/(tabs)/settings.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import Animated, { FadeInDown, SlideInDown } from 'react-native-reanimated';
import * as Crypto from 'expo-crypto';
import { PALETTE, SPACING, RADIUS, FONT } from '../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../src/components/ui/Button';
import { useToast } from '../../src/context/ToastContext';

const DEMO_ADMIN_PIN_SHA256 =
  '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4';

export default function SettingsScreen() {
  const { showToast } = useToast();

  const [isDirty, setIsDirty] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const markAsDirty = () => setIsDirty(true);

  /**
   * Simulación de validación segura asíncrona.
   *
   * En producción, esta función debe delegar la validación a un backend o a un flujo
   * de autenticación seguro. Este hash local existe solo como puente de arquitectura
   * para evitar comparar el PIN en texto plano directamente dentro del controlador UI.
   */
  const verifyAdminPinSecurely = async (candidatePin: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 650));

    const candidateHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      candidatePin.trim()
    );

    return candidateHash === DEMO_ADMIN_PIN_SHA256;
  };

  const handleUnlock = async () => {
    const normalizedPin = pin.trim();

    if (!normalizedPin) {
      setPinError(true);
      showToast('Ingresa tu PIN para continuar.', 'warning');
      return;
    }

    setIsUnlocking(true);
    setPinError(false);

    try {
      const isValid = await verifyAdminPinSecurely(normalizedPin);

      if (isValid) {
        setIsUnlocked(true);
        setPinError(false);
        setPin('');
        showToast('Zona administrativa desbloqueada', 'success');
      } else {
        setIsUnlocked(false);
        setPinError(true);
        showToast('PIN incorrecto. Acceso denegado.', 'info');
      }
    } catch {
      setIsUnlocked(false);
      setPinError(true);
      showToast('No fue posible validar el acceso administrativo.', 'error');
    } finally {
      setIsUnlocking(false);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPin('');
    setPinError(false);
    showToast('Zona administrativa bloqueada de forma segura', 'info');
  };

  const handleSave = () => {
    if (!hasPermissions) {
      showToast('Error: Se requieren permisos de GPS para operar', 'error');
      return;
    }

    setIsDirty(false);
    showToast('Configuración guardada exitosamente', 'success');
  };

  const togglePermissionsSimulator = () => {
    const newState = !hasPermissions;
    setHasPermissions(newState);

    if (newState) {
      showToast('Sistema: Permisos de ubicación restaurados', 'success');
    } else {
      showToast('CRÍTICO: El SO revocó los permisos en segundo plano', 'warning');
      markAsDirty();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <Animated.View entering={FadeInDown.duration(400)}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ajustes</Text>
          <Text style={styles.headerSubtitle}>CONFIGURACIÓN Y SEGURIDAD</Text>
        </View>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* PERFIL LABORAL */}
        <Animated.View entering={FadeInDown.delay(100).springify().damping(20)}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Perfil Laboral</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre</Text>
              <TextInput
                style={styles.input}
                defaultValue="Alex León"
                onChangeText={markAsDirty}
                placeholderTextColor={PALETTE.textMuted}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tarifa por hora ($)</Text>
              <TextInput
                style={styles.input}
                defaultValue="20.00"
                keyboardType="numeric"
                onChangeText={markAsDirty}
                placeholderTextColor={PALETTE.textMuted}
              />
            </View>
          </View>
        </Animated.View>

        {/* PARÁMETROS DE JORNADA */}
        <Animated.View entering={FadeInDown.delay(200).springify().damping(20)}>
          <View style={[styles.card, !isUnlocked && styles.cardLocked]}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.sectionTitle}>Parámetros de Jornada</Text>
              {!isUnlocked && <Ionicons name="lock-closed" size={16} color={PALETTE.mutedGold} />}
            </View>

            <View style={styles.horizontalInputs}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Hora base</Text>
                <TextInput
                  style={[styles.input, !isUnlocked && styles.inputDisabled]}
                  defaultValue="06:00"
                  editable={isUnlocked}
                  onChangeText={markAsDirty}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Mult. Overtime</Text>
                <TextInput
                  style={[styles.input, !isUnlocked && styles.inputDisabled]}
                  defaultValue="1.5"
                  editable={isUnlocked}
                  onChangeText={markAsDirty}
                />
              </View>
            </View>
          </View>
        </Animated.View>

        {/* MONITOREO Y UBICACIÓN */}
        <Animated.View entering={FadeInDown.delay(300).springify().damping(20)}>
          <View
            style={[styles.card, !hasPermissions && { borderColor: PALETTE.deepRed, borderWidth: 1 }]}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={styles.sectionTitle}>Monitoreo y Ubicación</Text>
              <Pressable onPress={togglePermissionsSimulator}>
                <Text style={{ ...FONT.label, color: PALETTE.mutedGold }}>Simular SO</Text>
              </Pressable>
            </View>

            <View style={styles.healthRow}>
              <View
                style={[
                  styles.healthDot,
                  { backgroundColor: hasPermissions ? PALETTE.successGreen : PALETTE.deepRed },
                ]}
              />
              <Text style={[styles.healthText, !hasPermissions && { color: PALETTE.deepRed }]}>
                {hasPermissions ? 'Permiso de ubicación activo' : 'Permiso de ubicación REVOCADO'}
              </Text>
            </View>

            <View style={styles.healthRow}>
              <View
                style={[
                  styles.healthDot,
                  { backgroundColor: hasPermissions ? PALETTE.successGreen : PALETTE.deepRed },
                ]}
              />
              <Text style={[styles.healthText, !hasPermissions && { color: PALETTE.deepRed }]}>
                {hasPermissions
                  ? 'Ubicación en segundo plano activa'
                  : 'Ubicación bloqueada por sistema'}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* ZONA ADMINISTRATIVA */}
        <Animated.View entering={FadeInDown.delay(400).springify().damping(20)}>
          <View
            style={[
              styles.card,
              {
                borderColor: isUnlocked ? PALETTE.successGreen : PALETTE.steelLine,
                borderWidth: 1,
              },
            ]}
          >
            <View style={styles.secureBlockHeader}>
              <Ionicons
                name={isUnlocked ? 'lock-open' : 'lock-closed'}
                size={20}
                color={isUnlocked ? PALETTE.successGreen : PALETTE.mutedGold}
              />
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    marginBottom: 0,
                    color: isUnlocked ? PALETTE.successGreen : PALETTE.mutedGold,
                  },
                ]}
              >
                Zona Administrativa
              </Text>
            </View>

            <Text style={styles.secureBlockDesc}>
              {isUnlocked
                ? 'Acceso concedido. Parámetros desbloqueados.'
                : 'Esta sección requiere acceso protegido.'}
            </Text>

            {!isUnlocked ? (
              <View style={styles.verticalGap}>
                <TextInput
                  style={[styles.input, pinError && { borderColor: PALETTE.deepRed, borderWidth: 1 }]}
                  placeholder="Ingresa tu PIN"
                  placeholderTextColor={PALETTE.textMuted}
                  keyboardType="numeric"
                  secureTextEntry
                  value={pin}
                  editable={!isUnlocking}
                  onChangeText={(t) => {
                    setPin(t);
                    setPinError(false);
                  }}
                />

                <Button
                  label="Desbloquear"
                  variant="ghost"
                  onPress={handleUnlock}
                  isLoading={isUnlocking}
                  disabled={!pin.trim() || isUnlocking}
                />
              </View>
            ) : (
              <Button label="Bloquear panel" variant="secondary" onPress={handleLock} />
            )}
          </View>
        </Animated.View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FOOTER FLOTANTE */}
      <Animated.View entering={SlideInDown.delay(500).springify().damping(20)}>
        <View style={styles.actionFooter}>
          <Button
            label="Guardar cambios"
            variant="primary"
            onPress={handleSave}
            disabled={!isDirty || !hasPermissions}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PALETTE.obsidian,
  },
  header: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: PALETTE.textPrimary,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    color: PALETTE.textSecondary,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
  },
  card: {
    padding: SPACING.lg,
    borderRadius: RADIUS.cards,
    backgroundColor: PALETTE.carbonMist,
    marginBottom: SPACING.lg,
  },
  cardLocked: {
    opacity: 0.7,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...FONT.h3,
    fontSize: 18,
    color: PALETTE.textPrimary,
    marginBottom: SPACING.lg,
  },
  horizontalInputs: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  verticalGap: {
    gap: SPACING.md,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
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
  inputDisabled: {
    color: PALETTE.textMuted,
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  healthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },
  healthText: {
    ...FONT.body,
    fontSize: 14,
    color: PALETTE.textSecondary,
  },
  secureBlockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  secureBlockDesc: {
    ...FONT.body,
    color: PALETTE.textSecondary,
    marginBottom: SPACING.lg,
  },
  actionFooter: {
    padding: SPACING.xl,
    paddingBottom: Platform.OS === 'ios' ? 40 : SPACING.xl,
    backgroundColor: PALETTE.obsidian,
    borderTopWidth: 1,
    borderTopColor: PALETTE.steelLine,
  },
});

