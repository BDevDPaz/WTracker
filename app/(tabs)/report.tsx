// app/(tabs)/report.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { PALETTE, SPACING, RADIUS, FONT } from '../../src/constants/theme';
import { DocumentPreviewWidget } from '../../src/components/ui/DocumentPreviewWidget';
import { Button } from '../../src/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from '../../src/context/ToastContext';

export default function ReportScreen() {
  const { showToast } = useToast();

  // --- Estados de la Máquina del Exportador ---
  const [isExporting, setIsExporting] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false); // Desbloquea las acciones secundarias

  // --- Simulador de Edge-Case (Fallo de Memoria) ---
  const [forceMemoryError, setForceMemoryError] = useState(false);

  // Alternar el simulador de error
  const toggleErrorSimulator = () => {
    const newState = !forceMemoryError;
    setForceMemoryError(newState);
    if (newState) {
      showToast('Modo pruebas: Error de memoria ACTIVADO', 'info');
      setHasGenerated(false); // Resetea el estado si había un documento previo
    } else {
      showToast('Modo pruebas: Comportamiento normal restaurado', 'success');
    }
  };

  // Motor de Generación Simulado
  const handleGenerateReport = () => {
    setIsExporting(true);
    
    // Simulamos el tiempo que tarda el motor de PDF (1.5 segundos)
    setTimeout(() => {
      setIsExporting(false);
      
      if (forceMemoryError) {
        // EDGE-CASE: Fallo de hardware/memoria
        showToast('Error: Memoria insuficiente para exportar PDF', 'info');
        setHasGenerated(false);
      } else {
        // HAPPY PATH: Éxito
        showToast('Reporte oficial generado correctamente', 'success');
        setHasGenerated(true); // Desbloquea Compartir, Email, etc.
      }
    }, 1500); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Encabezado con Simulador Oculto */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Reportes</Text>
            {/* BOTÓN OCULTO PARA SIMULAR FALLO DE MEMORIA */}
            <Pressable onPress={toggleErrorSimulator}>
              <Text style={[styles.simulatorText, forceMemoryError && { color: PALETTE.deepRed }]}>
                {forceMemoryError ? 'SIMULAR: FALLO' : 'SIMULAR: OK'}
              </Text>
            </Pressable>
          </View>
          <Text style={styles.headerSubtitle}>RESUMEN SEMANAL</Text>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <Pressable style={styles.arrowButton}>
            <Ionicons name="chevron-back" size={20} color={PALETTE.textPrimary} />
          </Pressable>
          <View style={styles.periodCenter}>
            <Text style={styles.periodLabel}>Semana actual</Text>
            <Text style={styles.periodDates}>Jun 01 - Jun 07</Text>
          </View>
          <Pressable style={styles.arrowButton}>
            <Ionicons name="chevron-forward" size={20} color={PALETTE.textSecondary} />
          </Pressable>
        </View>

        {/* Financial Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTopLabel}>TOTAL SEMANA</Text>
          <Text style={styles.summaryMassiveMetric}>$256.00</Text>
          <View style={styles.summarySubMetricsRow}>
            <Text style={styles.summarySubMetricText}>12.8 h  •  4 sesiones</Text>
            <Text style={styles.summaryTrailingMetric}>Overtime: $0.00</Text>
          </View>
        </View>

        {/* Document Preview Widget */}
        <View style={styles.widgetWrapper}>
          <DocumentPreviewWidget 
            employeeName="Alex León"
            dateRange="Jun 01, 2026 - Jun 07, 2026"
            totalHours="12.8 h"
            totalEarnings="$256.00"
          />
        </View>

        {/* Breakdown Grid */}
        <View style={styles.breakdownGrid}>
          <View style={styles.breakdownRow}><Text style={styles.breakdownKey}>Horas normales</Text><Text style={styles.breakdownValue}>12.8 h</Text></View>
          <View style={styles.breakdownRow}><Text style={styles.breakdownKey}>Overtime</Text><Text style={styles.breakdownValue}>0.0 h</Text></View>
          <View style={styles.divider} />
          <View style={styles.breakdownRow}><Text style={styles.breakdownKey}>Tarifa base</Text><Text style={styles.breakdownValue}>$20.00/h</Text></View>
          <View style={styles.breakdownRow}><Text style={styles.breakdownKey}>Multiplicador OT</Text><Text style={styles.breakdownValue}>1.5x</Text></View>
          <View style={styles.divider} />
          <View style={styles.breakdownTotalRow}><Text style={styles.breakdownTotalKey}>TOTAL NETO</Text><Text style={styles.breakdownTotalValue}>$256.00</Text></View>
        </View>

        {/* Action Stack (Motor de Exportación Interactiva) */}
        <View style={styles.actionStack}>
          <Button 
            label={isExporting ? "Generando documento..." : (hasGenerated ? "Regenerar reporte" : "Generar reporte")}
            variant="primary" 
            onPress={handleGenerateReport} 
            isLoading={isExporting}
          />
          {/* Estos botones nacen bloqueados hasta que se genera el documento */}
          <Button 
            label="Compartir" 
            variant="secondary" 
            onPress={() => showToast('Abriendo menú nativo de iOS/Android...', 'info')} 
            disabled={isExporting || !hasGenerated}
          />
          <Button 
            label="Enviar por correo" 
            variant="secondary" 
            onPress={() => showToast('Redirigiendo al cliente de correo...', 'info')} 
            disabled={isExporting || !hasGenerated}
          />
          <Button 
            label="Previsualizar" 
            variant="ghost" 
            onPress={() => showToast('Abriendo visor interno de PDF...', 'info')} 
            disabled={isExporting || !hasGenerated}
          />
        </View>

        <Text style={styles.trustNote}>* Incluye horas, sesiones detalladas, notas y eventos de auditoría forense.</Text>

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
  
  periodSelector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: SPACING.xl, padding: SPACING.lg, borderRadius: 20, backgroundColor: PALETTE.graphite, marginBottom: SPACING.lg },
  arrowButton: { padding: SPACING.xs },
  periodCenter: { alignItems: 'center' },
  periodLabel: { ...FONT.bodyStrong, color: PALETTE.textPrimary },
  periodDates: { ...FONT.caption, color: PALETTE.textSecondary, marginTop: 2 },
  
  summaryCard: { marginHorizontal: SPACING.xl, padding: 20, borderRadius: RADIUS.cards, backgroundColor: PALETTE.carbonMist, marginBottom: SPACING.lg },
  summaryTopLabel: { ...FONT.label, color: PALETTE.textSecondary, marginBottom: SPACING.xs },
  summaryMassiveMetric: { fontSize: 40, fontWeight: '700', color: PALETTE.mutedGold, letterSpacing: -0.5, marginBottom: SPACING.sm },
  summarySubMetricsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summarySubMetricText: { fontSize: 15, color: PALETTE.textPrimary },
  summaryTrailingMetric: { fontSize: 13, color: PALETTE.textSecondary },
  
  widgetWrapper: { marginBottom: SPACING.lg },
  
  breakdownGrid: { marginHorizontal: SPACING.xl, padding: 18, borderRadius: RADIUS.cards, backgroundColor: PALETTE.graphite, marginBottom: SPACING.xl },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.sm },
  breakdownKey: { ...FONT.body, color: PALETTE.textSecondary },
  breakdownValue: { ...FONT.bodyStrong, color: PALETTE.textPrimary },
  divider: { height: 1, backgroundColor: PALETTE.steelLine, marginVertical: SPACING.md },
  breakdownTotalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: SPACING.xs },
  breakdownTotalKey: { ...FONT.bodyStrong, color: PALETTE.textPrimary },
  breakdownTotalValue: { fontSize: 18, fontWeight: '700', color: PALETTE.mutedGold },
  
  actionStack: { marginHorizontal: SPACING.xl, gap: 12, marginBottom: SPACING.xl },
  trustNote: { ...FONT.caption, color: PALETTE.textSecondary, textAlign: 'center', marginHorizontal: SPACING.xxl, fontStyle: 'italic' },
});

