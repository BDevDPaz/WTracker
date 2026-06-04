// app/(tabs)/history.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { PALETTE, SPACING, RADIUS, FONT } from '../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { IntegrityBadge, BadgeType } from '../../src/components/ui/IntegrityBadge';
import { useToast } from '../../src/context/ToastContext';

// Datos de Happy Path
const NORMAL_MOCK_DATA = [
  { id: '1', date: 'lun., 1 jun 2026', destination: '5320 Newcastle Ave', time: '04:56 PM - 06:34 PM', hours: '1.6h', earnings: '$32.00', status: 'valid' as BadgeType },
  { id: '2', date: 'mar., 2 jun 2026', destination: '10101 Lindley Ave, Northridge, CA', time: '02:25 PM - 02:35 PM', hours: '0.2h', earnings: '$4.00', status: 'manual' as BadgeType },
  { id: '3', date: 'mié., 3 jun 2026', destination: 'Warehouse Central', time: '08:00 AM - 05:00 PM', hours: '9.0h', earnings: '$180.00', status: 'auto' as BadgeType },
  { id: '4', date: 'jue., 4 jun 2026', destination: 'Site B - Industrial', time: '10:00 AM - 12:00 PM', hours: '2.0h', earnings: '$40.00', status: 'warning' as BadgeType },
];

// El Registro de Edge-Case (Corrupto)
const CORRUPTED_SESSION = {
  id: 'ERR-503', 
  date: 'HOY', 
  destination: 'Fallo de Sincronización (Dispositivo apagado)', 
  time: '14:20 PM - ??:??', 
  hours: 'NaN h', 
  earnings: 'ERROR', 
  status: 'error' as BadgeType 
};

export default function HistoryScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const [activeFilter, setActiveFilter] = useState('Todo');

  // --- Simulador de Edge-Case (Corrupción de BD) ---
  const [simulateCorruption, setSimulateCorruption] = useState(false);

  const toggleCorruptionSimulator = () => {
    const newState = !simulateCorruption;
    setSimulateCorruption(newState);
    if (newState) {
      showToast('CRÍTICO: Simulando corrupción de base de datos local', 'info');
    } else {
      showToast('Sistema: Base de datos restaurada correctamente', 'success');
    }
  };

  // Motor de inyección: Si hay corrupción, metemos el registro malo al inicio de la lista
  const currentData = simulateCorruption ? [CORRUPTED_SESSION, ...NORMAL_MOCK_DATA] : NORMAL_MOCK_DATA;

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Encabezado con Simulador Oculto */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Historial</Text>
          {/* BOTÓN OCULTO DE CAOS */}
          <Pressable onPress={toggleCorruptionSimulator}>
            <Text style={[styles.simulatorText, simulateCorruption && { color: PALETTE.deepRed }]}>
              {simulateCorruption ? 'SIMULAR: BD ROTA' : 'SIMULAR: BD OK'}
            </Text>
          </Pressable>
        </View>
        <Text style={styles.headerSubtitle}>RESUMEN DE SESIONES</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Resumen Semanal */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTopLabel}>ESTA SEMANA</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryMassiveMetric}>{simulateCorruption ? 'ERROR' : '12.8 h'}</Text>
            <Text style={styles.summaryMoneyMetric}>{simulateCorruption ? '---' : '$256.00'}</Text>
          </View>
          <Text style={styles.summaryTrailingMetric}>4 sesiones • 1 ajuste manual</Text>
        </View>

        {/* Filtros */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          {['Todo', 'Esta semana', 'Mes', 'Ajustadas', 'Auto cerrado'].map((filter) => (
            <Pressable 
              key={filter} 
              style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Lista de Sesiones */}
        {currentData.map((item, index) => (
          <Pressable 
            key={index}
            style={({ pressed }) => [
              styles.sessionCard, 
              { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
              // Si la sesión es la corrupta, el borde se vuelve rojo intermitente
              item.status === 'error' && { borderColor: PALETTE.deepRed, borderWidth: 1 }
            ]}
            onPress={() => router.push(`/session/${item.id}`)}
          >
            {/* Fila Superior */}
            <View style={styles.cardTopRow}>
              <Text style={styles.sessionDate}>{item.date}</Text>
              <IntegrityBadge type={item.status} />
            </View>
            
            {/* Destino y Horario */}
            <Text style={[styles.destinationTitle, item.status === 'error' && { color: PALETTE.deepRed }]} numberOfLines={1}>
              {item.destination}
            </Text>
            <Text style={styles.timeText}>{item.time}</Text>
            
            {/* Fila Inferior (Métricas) */}
            <View style={styles.cardBottomRow}>
              <Text style={styles.hoursText}>{item.hours}</Text>
              <Text style={[styles.earningsText, item.status === 'error' && { color: PALETTE.deepRed }]}>{item.earnings}</Text>
            </View>
          </Pressable>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: PALETTE.obsidian },
  scrollContent: { paddingBottom: 40 },
  header: { marginHorizontal: SPACING.xl, marginTop: SPACING.sm, marginBottom: SPACING.xl },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '700', color: PALETTE.textPrimary },
  simulatorText: { ...FONT.label, color: PALETTE.mutedGold },
  headerSubtitle: { fontSize: 11, letterSpacing: 2, color: PALETTE.textSecondary, textTransform: 'uppercase', marginTop: 4 },
  
  summaryCard: { marginHorizontal: SPACING.xl, padding: 20, borderRadius: RADIUS.cards, backgroundColor: PALETTE.carbonMist, marginBottom: SPACING.xl },
  summaryTopLabel: { ...FONT.label, color: PALETTE.textSecondary, marginBottom: SPACING.xs },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 },
  summaryMassiveMetric: { fontSize: 40, fontWeight: '700', color: PALETTE.textPrimary, letterSpacing: -1 },
  summaryMoneyMetric: { fontSize: 32, fontWeight: '700', color: PALETTE.mutedGold },
  summaryTrailingMetric: { fontSize: 13, color: PALETTE.textSecondary },

  filtersContainer: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.xl, gap: SPACING.sm },
  filterPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: PALETTE.carbonMist, borderWidth: 1, borderColor: PALETTE.steelLine },
  filterPillActive: { backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: PALETTE.mutedGold },
  filterText: { ...FONT.body, color: PALETTE.textSecondary },
  filterTextActive: { color: PALETTE.mutedGold, fontWeight: '600' },

  sessionCard: { marginHorizontal: SPACING.xl, padding: 16, borderRadius: RADIUS.cards, backgroundColor: PALETTE.graphite, marginBottom: SPACING.md },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  sessionDate: { ...FONT.caption, color: PALETTE.textSecondary },
  destinationTitle: { ...FONT.h3, fontSize: 18, color: PALETTE.textPrimary, marginBottom: 4 },
  timeText: { ...FONT.body, color: PALETTE.textSecondary, marginBottom: SPACING.md },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: PALETTE.steelLine },
  hoursText: { fontSize: 18, fontWeight: '700', color: PALETTE.textPrimary },
  earningsText: { fontSize: 18, fontWeight: '700', color: PALETTE.mutedGold },
});

