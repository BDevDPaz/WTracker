import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE, RADIUS, SPACING, FONT } from '../../constants/theme';

interface DocumentPreviewWidgetProps {
  employeeName: string;
  dateRange: string;
  totalHours: string;
  totalEarnings: string;
}

export function DocumentPreviewWidget({
  employeeName,
  dateRange,
  totalHours,
  totalEarnings,
}: DocumentPreviewWidgetProps) {
  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.docHeader}>
        <Ionicons name="document-text-outline" size={14} color={PALETTE.mutedGold} />
        <Text style={styles.docHeaderText}>Vista previa del reporte</Text>
      </View>

      {/* Documento */}
      <View style={styles.paper}>
        
        <View style={styles.paperHeaderRow}>
          <Text style={styles.companyName}>Switch to LED Electrical Services</Text>
          <Text style={styles.docType}>Reporte semanal</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailsRow}>
          <View>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>{employeeName}</Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.label}>Periodo</Text>
            <Text style={styles.value}>{dateRange}</Text>
          </View>
        </View>

        {/* Simulación de jornadas */}
        <View style={styles.skeletonContainer}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.skeletonRow}>
              <View style={styles.skeletonBarLong} />
              <View style={styles.skeletonBarShort} />
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.totalsRow}>
          <Text style={styles.totalLabel}>Total horas: {totalHours}</Text>
          <Text style={styles.totalValue}>{totalEarnings}</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.xl,
    alignItems: 'center',
  },

  docHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: 6,
  },

  docHeaderText: {
    ...FONT.label,
    color: PALETTE.textSecondary,
  },

  paper: {
    width: '100%',
    backgroundColor: '#EAECEE',
    borderRadius: RADIUS.inputs,
    padding: SPACING.lg,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },

  paperHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },

  companyName: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1A1A1A',
    width: '60%',
  },

  docType: {
    fontSize: 9,
    fontWeight: '800',
    color: '#666666',
    letterSpacing: 1,
  },

  divider: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginVertical: SPACING.md,
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },

  label: {
    fontSize: 9,
    fontWeight: '700',
    color: '#888888',
    textTransform: 'uppercase',
    marginBottom: 2,
  },

  value: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333333',
  },

  skeletonContainer: {
    gap: 10,
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },

  skeletonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  skeletonBarLong: {
    height: 5,
    backgroundColor: '#D1D5DB',
    borderRadius: 3,
    width: '65%',
  },

  skeletonBarShort: {
    height: 5,
    backgroundColor: '#D1D5DB',
    borderRadius: 3,
    width: '20%',
  },

  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#666666',
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
});
