import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { PALETTE, SPACING, RADIUS, FONT } from '../../src/constants/theme';
import { DocumentPreviewWidget } from '../../src/components/ui/DocumentPreviewWidget';
import { Button } from '../../src/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from '../../src/context/ToastContext';

export default function ReportScreen() {
  const { showToast } = useToast();

  const [isExporting, setIsExporting] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [forceMemoryError, setForceMemoryError] = useState(false);

  const toggleErrorSimulator = () => {
    const newState = !forceMemoryError;
    setForceMemoryError(newState);

    if (newState) {
      showToast('Modo prueba: error de memoria activado', 'info');
      setHasGenerated(false);
    } else {
      showToast('Modo prueba desactivado', 'success');
    }
  };

  const handleGenerateReport = () => {
    setIsExporting(true);

    setTimeout(() => {
      setIsExporting(false);

      if (forceMemoryError) {
        showToast('No fue posible generar el documento', 'error');
        setHasGenerated(false);
      } else {
        showToast('Reporte generado correctamente', 'success');
        setHasGenerated(true);
      }
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
          <View style={styles.headerRow}>
            <Ionicons name="document-text-outline" size={22} color={PALETTE.textPrimary} />
            <Text style={styles.headerTitle}>Reportes</Text>

            <Pressable onPress={toggleErrorSimulator}>
              <Text style={[styles.simulatorText, forceMemoryError && { color: PALETTE.deepRed }]}>
                {forceMemoryError ? 'Simular fallo' : 'Simular correcto'}
              </Text>
            </Pressable>
          </View>

          <Text style={styles.headerSubtitle}>Resumen semanal</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).springify().damping(20)} style={styles.periodSelector}>
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
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).springify().damping(20)} style={styles.summaryCard}>
          <Text style={styles.summaryTopLabel}>Total semanal</Text>
          <Text style={styles.summaryMassiveMetric}>$256.00</Text>

          <View style={styles.summarySubMetricsRow}>
            <Text style={styles.summarySubMetricText}>12.8 h • 4 jornadas</Text>
            <Text style={styles.summaryTrailingMetric}>Horas extra: $0.00</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).springify().damping(20)} style={styles.widgetWrapper}>
          <DocumentPreviewWidget
            employeeName="Alex León"
            dateRange="Jun 01, 2026 - Jun 07, 2026"
            totalHours="12.8 h"
            totalEarnings="$256.00"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).springify().damping(20)} style={styles.breakdownGrid}>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownKey}>Horas normales</Text>
            <Text style={styles.breakdownValue}>12.8 h</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownKey}>Horas extra</Text>
            <Text style={styles.breakdownValue}>0.0 h</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownKey}>Tarifa base</Text>
            <Text style={styles.breakdownValue}>$20.00/h</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownKey}>Multiplicador extra</Text>
            <Text style={styles.breakdownValue}>1.5x</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownTotalRow}>
            <Text style={styles.breakdownTotalKey}>Total neto</Text>
            <Text style={styles.breakdownTotalValue}>$256.00</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).springify().damping(20)} style={styles.actionStack}>
          <Button
            label={isExporting ? 'Generando documento...' : (hasGenerated ? 'Generar nuevamente' : 'Generar reporte')}
            variant="primary"
            onPress={handleGenerateReport}
            isLoading={isExporting}
          />

          <Button
            label="Compartir"
            variant="secondary"
            onPress={() => showToast('Abriendo opciones del sistema...', 'info')}
            disabled={isExporting || !hasGenerated}
          />

          <Button
            label="Enviar por correo"
            variant="secondary"
            onPress={() => showToast('Abriendo cliente de correo...', 'info')}
            disabled={isExporting || !hasGenerated}
          />

          <Button
            label="Vista previa"
            variant="ghost"
            onPress={() => showToast('Abriendo vista previa...', 'info')}
            disabled={isExporting || !hasGenerated}
          />
        </Animated.View>

        <Animated.Text entering={FadeInDown.delay(600).duration(400)} style={styles.trustNote}>
          Incluye horas, jornadas detalladas y eventos registrados.
        </Animated.Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: PALETTE.obsidian },
  scrollContent: { paddingBottom: 40 },

  header: {
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: PALETTE.textPrimary,
  },

  simulatorText: {
    ...FONT.label,
    color: PALETTE.mutedGold,
  },

  headerSubtitle: {
    fontSize: 12,
    color: PALETTE.textSecondary,
    marginTop: 4,
  },

  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SPACING.xl,
    padding: SPACING.lg,
    borderRadius: 20,
    backgroundColor: PALETTE.graphite,
    marginBottom: SPACING.lg,
  },

  arrowButton: {
    padding: SPACING.xs,
  },

  periodCenter: {
    alignItems: 'center',
  },

  periodLabel: {
    ...FONT.bodyStrong,
    color: PALETTE.textPrimary,
  },

  periodDates: {
    ...FONT.caption,
    color: PALETTE.textSecondary,
    marginTop: 2,
  },

  summaryCard: {
    marginHorizontal: SPACING.xl,
    padding: 20,
    borderRadius: RADIUS.cards,
    backgroundColor: PALETTE.carbonMist,
    marginBottom: SPACING.lg,
  },

  summaryTopLabel: {
    ...FONT.label,
    color: PALETTE.textSecondary,
    marginBottom: SPACING.xs,
  },

  summaryMassiveMetric: {
    fontSize: 40,
    fontWeight: '700',
    color: PALETTE.mutedGold,
    marginBottom: SPACING.sm,
  },

  summarySubMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  summarySubMetricText: {
    fontSize: 15,
    color: PALETTE.textPrimary,
  },

  summaryTrailingMetric: {
    fontSize: 13,
    color: PALETTE.textSecondary,
  },

  widgetWrapper: {
    marginBottom: SPACING.lg,
  },

  breakdownGrid: {
    marginHorizontal: SPACING.xl,
    padding: 18,
    borderRadius: RADIUS.cards,
    backgroundColor: PALETTE.graphite,
    marginBottom: SPACING.xl,
  },

  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },

  breakdownKey: {
    ...FONT.body,
    color: PALETTE.textSecondary,
  },

  breakdownValue: {
    ...FONT.bodyStrong,
    color: PALETTE.textPrimary,
  },

  divider: {
    height: 1,
    backgroundColor: PALETTE.steelLine,
    marginVertical: SPACING.md,
  },

  breakdownTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  breakdownTotalKey: {
    ...FONT.bodyStrong,
    color: PALETTE.textPrimary,
  },

  breakdownTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: PALETTE.mutedGold,
  },

  actionStack: {
    marginHorizontal: SPACING.xl,
    gap: 12,
    marginBottom: SPACING.xl,
  },

  trustNote: {
    ...FONT.caption,
    color: PALETTE.textSecondary,
    textAlign: 'center',
    marginHorizontal: SPACING.xxl,
    fontStyle: 'italic',
  },
});
