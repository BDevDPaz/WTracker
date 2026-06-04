// src/components/ui/DocumentPreviewWidget.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PALETTE, RADIUS, SPACING } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface DocumentPreviewWidgetProps {
  dateRange: string;
  totalHours: string;
  totalEarnings: string;
  employeeName?: string;
}

export function DocumentPreviewWidget({
  dateRange,
  totalHours,
  totalEarnings,
  employeeName = 'W Tracker Profile',
}: DocumentPreviewWidgetProps) {
  return (
    <View style={styles.paperContainer}>
      {/* Header del Documento Simulado */}
      <View style={styles.docHeader}>
        <View style={styles.brandingRow}>
          <Ionicons name="flash" size={16} color="#000000" />
          <Text style={styles.brandText}>W TRACKER</Text>
        </View>
        <Text style={styles.docType}>Reporte Oficial</Text>
      </View>

      {/* Bloque de Datos */}
      <View style={styles.dataBlock}>
        <Text style={styles.employeeName}>{employeeName}</Text>
        <Text style={styles.dateRange}>{dateRange}</Text>
        
        <View style={styles.totalsRow}>
          <View>
            <Text style={styles.metricLabel}>Total Horas</Text>
            <Text style={styles.metricValue}>{totalHours}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.metricLabel}>Ingreso Neto</Text>
            <Text style={styles.metricValue}>{totalEarnings}</Text>
          </View>
        </View>
      </View>

      {/* Mock Lines (Simulación de Tablas del PDF) */}
      <View style={styles.mockTable}>
        <View style={styles.mockHeaderRow} />
        <View style={[styles.mockRow, { width: '100%' }]} />
        <View style={[styles.mockRow, { width: '85%' }]} />
        <View style={[styles.mockRow, { width: '92%' }]} />
        <View style={[styles.mockRow, { width: '70%' }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paperContainer: {
    marginHorizontal: SPACING.xl,
    padding: 24,
    borderRadius: RADIUS.cards,
    backgroundColor: '#FAFAFA', // Blanco roto para simular papel
    minHeight: 220,
    // Sombra para darle elevación sobre el fondo oscuro
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  docHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: SPACING.md,
    marginBottom: SPACING.md,
  },
  brandingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#000000',
  },
  docType: {
    fontSize: 10,
    fontWeight: '600',
    color: '#757575',
    textTransform: 'uppercase',
  },
  dataBlock: {
    marginBottom: SPACING.xl,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
  },
  dateRange: {
    fontSize: 12,
    color: '#757575',
    marginBottom: SPACING.md,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    padding: SPACING.md,
    borderRadius: RADIUS.inputs,
  },
  metricLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#757575',
    fontWeight: '700',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
  },
  mockTable: {
    gap: 8,
  },
  mockHeaderRow: {
    height: 6,
    backgroundColor: '#BDBDBD',
    borderRadius: 3,
    width: '100%',
    marginBottom: 4,
  },
  mockRow: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
});

