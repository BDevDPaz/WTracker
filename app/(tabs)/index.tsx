// app/(tabs)/index.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
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

  const getHeaderOrb = () => {
    switch (engineState) {
      case 'NO_INICIADA': case 'CERRADA': return { icon: 'moon' as const, color: PALETTE.textSecondary, glow: false };
      case 'ESPERANDO_LLEGADA': return { icon: 'pin' as const, color: PALETTE.slateBlue, glow: false };
      case 'ASINCRONIA_CHECKIN': case 'SALIDA_DETECTADA': return { icon: 'alert' as const, color: PALETTE.amberWarning, glow: true };
      case 'NO_SHOW': return { icon: 'warning' as const, color: PALETTE.deepRed, glow: true };
      case 'EN_TRASLADO': case 'ACTIVA': return { icon: 'location' as const, color: PALETTE.mutedGold, glow: true };
      default: return { icon: 'moon' as const, color: PALETTE.textSecondary, glow: false };
    }
  };

  const orb = getHeaderOrb();

  // --- Ciclo de Prueba ---
  const handlePrimaryMockAction = () => {
    switch (engineState) {
      case 'NO_INICIADA': setIsSetupModalVisible(true); break;
      case 'ESPERANDO_LLEGADA': setEngineState('ASINCRONIA_CHECKIN'); break;
      case 'ASINCRONIA_CHECKIN': setEngineState('NO_SHOW'); break;
      case 'NO_SHOW': showToast('Jornada forzada manualmente', 'info'); setEngineState('ACTIVA'); break;
      case 'EN_TRASLADO': setEngineState('ACTIVA'); break;
      case 'ACTIVA': setEngineState('SALIDA_DETECTADA'); break;
      case 'SALIDA_DETECTADA': setIsExitModalVisible(true); break;
      case 'CERRADA': setEngineState('NO_INICIADA'); setCurrentDestination(''); break;
    }
  };

  const handleSecondaryMockAction = () => {
    if (engineState === 'ASINCRONIA_CHECKIN') showToast('Esperando reconexión GPS...', 'info');
    else if (engineState === 'NO_SHOW') { setEngineState('NO_INICIADA'); showToast('Sesión abortada por el usuario', 'info'); }
    else if (engineState === 'ACTIVA') showToast('Abriendo teclado para nota rápida...', 'info');
    else if (engineState === 'SALIDA_DETECTADA') { setEngineState('ACTIVA'); showToast('Operación restaurada', 'success'); }
    else showToast('Acción secundaria ejecutada', 'info');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Encabezado */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>W Tracker</Text>
            <Text style={styles.headerSubtitle}>CONTROL DIARIO</Text>
          </View>
          <View style={[styles.statusOrb, orb.glow && { shadowColor: orb.color, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 }]}>
            <Ionicons name={orb.icon} size={20} color={orb.color} />
          </View>
        </View>

        {/* Tarjeta Principal */}
        <View style={styles.heroWrapper}>
          <OperationalHeroCard 
            state={engineState}
            destination={currentDestination || undefined}
            timeString={engineState === 'CERRADA' ? '08:14' : '02:45'}
            earnings={engineState === 'CERRADA' ? '$164.80' : '$55.00'}
            onPrimaryAction={handlePrimaryMockAction}
            onSecondaryAction={handleSecondaryMockAction}
          />
        </View>

        {/* --- COMPONENTES EXTRAÍDOS --- */}
        <DailySummaryBlock 
          hours={engineState === 'NO_INICIADA' ? '0.0h' : '2.8h'} 
          earnings={engineState === 'NO_INICIADA' ? '$0' : '$55'} 
        />
        
        <SystemHealthBlock engineState={engineState} />
        
        <SessionTimeline engineState={engineState} />

      </ScrollView>

      {/* --- MODALES --- */}
      <DailySetupModal visible={isSetupModalVisible} onCancel={() => setIsSetupModalVisible(false)} onConfirm={(d, a) => { setIsSetupModalVisible(false); setCurrentDestination(a ? `${a} - ${d}` : d); setEngineState('ESPERANDO_LLEGADA'); showToast('Monitoreo protegido activado', 'success'); }} />
      <LunchModal visible={isLunchModalVisible} onCancel={() => setIsLunchModalVisible(false)} onConfirm={(min) => { setIsLunchModalVisible(false); setEngineState('CERRADA'); showToast(`Jornada cerrada. ${min} min deducidos`, 'success'); }} />
      <ExitDetectionModal visible={isExitModalVisible} exitTime="04:30 PM" onContinueOperating={() => { setIsExitModalVisible(false); setEngineState('ACTIVA'); showToast('Operación restaurada', 'success'); }} onCloseShift={() => { setIsExitModalVisible(false); setIsLunchModalVisible(true); }} />

    </SafeAreaView>
  );
}

// Los estilos ahora son mínimos, solo posicionan los contenedores
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: PALETTE.obsidian },
  scrollContent: { paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: SPACING.xl, marginTop: SPACING.sm, marginBottom: SPACING.xl, minHeight: 60 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: PALETTE.textPrimary },
  headerSubtitle: { fontSize: 11, fontWeight: '600', letterSpacing: 2, color: PALETTE.textSecondary, marginTop: 2 },
  statusOrb: { width: 40, height: 40, borderRadius: 20, backgroundColor: PALETTE.carbonMist, borderWidth: 1, borderColor: PALETTE.steelLine, justifyContent: 'center', alignItems: 'center' },
  heroWrapper: { marginBottom: SPACING.lg },
});

