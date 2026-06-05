// app/(tabs)/index.tsx
import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  FadeInDown,
} from 'react-native-reanimated';
import { PALETTE, SPACING, FONT } from '../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';

// --- Providers & Modals ---
import { useToast } from '../../src/context/ToastContext';
import { DailySetupModal } from '../../src/components/modals/DailySetupModal';
import { LunchModal } from '../../src/components/modals/LunchModal';
import { ExitDetectionModal } from '../../src/components/modals/ExitDetectionModal';

// --- UI Components ---
import { OperationalHeroCard, EngineState } from '../../src/components/ui/OperationalHeroCard';
import { DailySummaryBlock } from '../../src/components/ui/DailySummaryBlock';
import { SystemHealthBlock } from '../../src/components/ui/SystemHealthBlock';
import { SessionTimeline } from '../../src/components/ui/SessionTimeline';

export default function HoyScreen() {
  const { showToast } = useToast();

  const [engineState, setEngineState] = useState<EngineState>('NO_INICIADA');
  const [currentDestination, setCurrentDestination] = useState('');
  const [isSetupModalVisible, setIsSetupModalVisible] = useState(false);
  const [isLunchModalVisible, setIsLunchModalVisible] = useState(false);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  // --- Animación del Efecto de Respiración (Breathing Orb) ---
  const glowScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.2);

  // --- Lógica de Íconos Duales y Estados ---
  const getHeaderOrb = () => {
    switch (engineState) {
      case 'NO_INICIADA':
      case 'CERRADA':
        return { icon: 'moon-outline' as const, color: PALETTE.textSecondary, glow: false };

      case 'ESPERANDO_LLEGADA':
        return { icon: 'pin-outline' as const, color: PALETTE.slateBlue, glow: false };

      case 'ASINCRONIA_CHECKIN':
      case 'SALIDA_DETECTADA':
        return { icon: 'alert-circle-outline' as const, color: PALETTE.amberWarning, glow: true };

      case 'NO_SHOW':
        return { icon: 'warning' as const, color: PALETTE.deepRed, glow: true };

      case 'EN_TRASLADO':
        return { icon: 'location-outline' as const, color: PALETTE.mutedGold, glow: true };

      case 'ACTIVA':
        return { icon: 'location' as const, color: PALETTE.mutedGold, glow: true };

      default:
        return { icon: 'moon-outline' as const, color: PALETTE.textSecondary, glow: false };
    }
  };

  const orb = getHeaderOrb();

  useFocusEffect(
    useCallback(() => {
      if (orb.glow) {
        glowScale.value = withRepeat(
          withTiming(1.15, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          -1,
          true
        );

        glowOpacity.value = withRepeat(
          withTiming(0.6, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          -1,
          true
        );
      } else {
        glowScale.value = withTiming(1, { duration: 500 });
        glowOpacity.value = withTiming(0, { duration: 500 });
      }

      // Función de limpieza cuando la pantalla pierde el foco
      return () => {
        glowScale.value = withTiming(1, { duration: 500 });
        glowOpacity.value = withTiming(0, { duration: 500 });
      };
    }, [orb.glow, glowScale, glowOpacity])
  );

  const animatedOrbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    shadowOpacity: glowOpacity.value,
  }));

  // --- Ciclo de Prueba ---
  const handlePrimaryMockAction = () => {
    switch (engineState) {
      case 'NO_INICIADA':
        setIsSetupModalVisible(true);
        break;

      case 'ESPERANDO_LLEGADA':
        setEngineState('ASINCRONIA_CHECKIN');
        break;

      case 'ASINCRONIA_CHECKIN':
        setEngineState('NO_SHOW');
        break;

      case 'NO_SHOW':
        showToast('Jornada forzada manualmente', 'info');
        setEngineState('ACTIVA');
        break;

      case 'EN_TRASLADO':
        setEngineState('ACTIVA');
        break;

      case 'ACTIVA':
        setEngineState('SALIDA_DETECTADA');
        break;

      case 'SALIDA_DETECTADA':
        setIsExitModalVisible(true);
        break;

      case 'CERRADA':
        setEngineState('NO_INICIADA');
        setCurrentDestination('');
        break;
    }
  };

  const handleSecondaryMockAction = () => {
    if (engineState === 'ASINCRONIA_CHECKIN') {
      showToast('Esperando reconexión GPS...', 'info');
    } else if (engineState === 'NO_SHOW') {
      setEngineState('NO_INICIADA');
      showToast('Sesión abortada por el usuario', 'info');
    } else if (engineState === 'ACTIVA') {
      showToast('Abriendo teclado para nota rápida...', 'info');
    } else if (engineState === 'SALIDA_DETECTADA') {
      setEngineState('ACTIVA');
      showToast('Operación restaurada', 'success');
    } else {
      showToast('Acción secundaria ejecutada', 'info');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Encabezado con Breathing Orb Animado (Entrada inicial) */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>W Tracker</Text>
            <Text style={styles.headerSubtitle}>CONTROL DIARIO</Text>
          </View>

          <Animated.View
            style={[
              styles.statusOrb,
              orb.glow && { shadowColor: orb.color, shadowRadius: 10, elevation: 6 },
              animatedOrbStyle,
            ]}
          >
            <Ionicons name={orb.icon} size={20} color={orb.color} />
          </Animated.View>
        </Animated.View>

        {/* Tarjeta Principal (Base de la cascada) */}
        <Animated.View entering={FadeInDown.delay(50).springify().damping(20)} style={styles.heroWrapper}>
          <OperationalHeroCard
            state={engineState}
            destination={currentDestination || undefined}
            timeString={engineState === 'CERRADA' ? '08:14' : '02:45'}
            earnings={engineState === 'CERRADA' ? '$164.80' : '$55.00'}
            onPrimaryAction={handlePrimaryMockAction}
            onSecondaryAction={handleSecondaryMockAction}
          />
        </Animated.View>

        {/* --- COMPONENTES EXTRAÍDOS --- */}
        <DailySummaryBlock
          hours={engineState === 'NO_INICIADA' ? '0.0h' : '2.8h'}
          earnings={engineState === 'NO_INICIADA' ? '$0' : '$55'}
        />

        <SystemHealthBlock engineState={engineState} />
        <SessionTimeline engineState={engineState} />
      </ScrollView>

      {/* --- MODALES --- */}
      <DailySetupModal
        visible={isSetupModalVisible}
        onCancel={() => setIsSetupModalVisible(false)}
        onConfirm={(d, a) => {
          setIsSetupModalVisible(false);
          setCurrentDestination(a ? `${a} - ${d}` : d);
          setEngineState('ESPERANDO_LLEGADA');
          showToast('Monitoreo protegido activado', 'success');
        }}
      />

      <LunchModal
        visible={isLunchModalVisible}
        onCancel={() => setIsLunchModalVisible(false)}
        onConfirm={(min) => {
          setIsLunchModalVisible(false);
          setEngineState('CERRADA');
          showToast(`Jornada cerrada. ${min} min deducidos`, 'success');
        }}
      />

      <ExitDetectionModal
        visible={isExitModalVisible}
        exitTime="04:30 PM"
        onContinueOperating={() => {
          setIsExitModalVisible(false);
          setEngineState('ACTIVA');
          showToast('Operación restaurada', 'success');
        }}
        onCloseShift={() => {
          setIsExitModalVisible(false);
          setIsLunchModalVisible(true);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PALETTE.obsidian,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
    minHeight: 60,
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
  statusOrb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: PALETTE.carbonMist,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroWrapper: {
    marginBottom: SPACING.lg,
  },
});

