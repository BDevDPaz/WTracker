// app/session/[id].tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PALETTE, SPACING, RADIUS, FONT } from '../../src/constants/theme';
import { IntegrityBadge } from '../../src/components/ui/IntegrityBadge';
import { Button } from '../../src/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { EditSessionModal } from '../../src/components/modals/EditSessionModal';
import { DeleteSessionModal } from '../../src/components/modals/DeleteSessionModal';

export default function SessionDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Atrapa el ID de la sesión

  // Estados de Modales
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Funciones simuladas
  const handleEditConfirm = (start: string, end: string, note: string) => {
    setIsEditModalVisible(false);
    Alert.alert('Éxito', 'Ajuste manual aplicado.');
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalVisible(false);
    Alert.alert('Eliminado', 'La sesión ha sido borrada.', [
      { text: 'OK', onPress: () => router.back() } // Regresa al historial
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header con retroceso */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={PALETTE.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Sesión: 1 jun 2026</Text>
        <View style={{ width: 24 }} /> {/* Espaciador para centrar título */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Bloque Resumen */}
        <View style={styles.summaryBlock}>
          <Text style={styles.destinationMassive}>5320 Newcastle Ave</Text>
          <View style={styles.totalsRow}>
            <Text style={styles.totalHours}>1.6 h</Text>
            <Text style={styles.totalMoney}>$32.00</Text>
          </View>
          <View style={styles.badgeWrapper}>
            <IntegrityBadge type="valid" />
          </View>
        </View>

        {/* Timeline Forense (Reemplaza los logs crudos) */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Trazabilidad (Timeline)</Text>
          <View style={styles.timelineNode}>
            <View style={[styles.dot, { backgroundColor: PALETTE.mutedGold }]} />
            <View style={styles.line} />
            <Text style={styles.nodeText}>Jornada iniciada (04:56 PM)</Text>
          </View>
          <View style={styles.timelineNode}>
            <View style={[styles.dot, { backgroundColor: PALETTE.successGreen }]} />
            <View style={styles.line} />
            <Text style={styles.nodeText}>Check-in GPS automático (04:58 PM)</Text>
          </View>
          <View style={styles.timelineNode}>
            <View style={[styles.dot, { backgroundColor: PALETTE.amberWarning }]} />
            <View style={styles.line} />
            <Text style={styles.nodeText}>Salida detectada automáticamente (06:30 PM)</Text>
          </View>
          <View style={[styles.timelineNode, { marginBottom: 0 }]}>
            <View style={[styles.dot, { backgroundColor: PALETTE.textSecondary }]} />
            <Text style={styles.nodeText}>Check-out manual (06:34 PM)</Text>
          </View>
        </View>

        {/* Detalles Laborales */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Detalles Laborales</Text>
          <View style={styles.detailRow}><Text style={styles.detailKey}>Tarifa base</Text><Text style={styles.detailValue}>$20.00 /h</Text></View>
          <View style={styles.detailRow}><Text style={styles.detailKey}>Overtime</Text><Text style={styles.detailValue}>0.0 h</Text></View>
          <View style={styles.detailRow}><Text style={styles.detailKey}>Almuerzo deducido</Text><Text style={styles.detailValue}>0 min</Text></View>
          <View style={styles.detailRow}><Text style={styles.detailKey}>ID Referencia</Text><Text style={styles.detailValue}>#{id}</Text></View>
        </View>

      </ScrollView>

      {/* Action Footer (Fijo al fondo) */}
      <View style={styles.actionFooter}>
        <View style={styles.buttonWrapper}>
          <Button label="Editar" variant="secondary" onPress={() => setIsEditModalVisible(true)} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button label="Eliminar" variant="danger" onPress={() => setIsDeleteModalVisible(true)} />
        </View>
      </View>

      {/* Modales Inyectados */}
      <EditSessionModal 
        visible={isEditModalVisible} 
        initialStart="04:56 PM" 
        initialEnd="06:34 PM" 
        onCancel={() => setIsEditModalVisible(false)} 
        onConfirm={handleEditConfirm} 
      />

      <DeleteSessionModal 
        visible={isDeleteModalVisible} 
        onCancel={() => setIsDeleteModalVisible(false)} 
        onConfirm={handleDeleteConfirm} 
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: PALETTE.obsidian },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', px: SPACING.xl, paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: PALETTE.steelLine },
  backButton: { padding: 4 },
  headerTitle: { ...FONT.bodyStrong, color: PALETTE.textPrimary, fontSize: 18 },
  scrollContent: { paddingBottom: 100 },
  
  // Resumen Block
  summaryBlock: { margin: SPACING.xl, padding: 24, borderRadius: RADIUS.cards, backgroundColor: PALETTE.carbonMist, alignItems: 'center' },
  destinationMassive: { fontSize: 22, fontWeight: '700', color: PALETTE.textPrimary, textAlign: 'center', marginBottom: SPACING.lg },
  totalsRow: { flexDirection: 'row', gap: 24, marginBottom: SPACING.md },
  totalHours: { fontSize: 32, fontWeight: '700', color: PALETTE.textPrimary },
  totalMoney: { fontSize: 32, fontWeight: '700', color: PALETTE.mutedGold },
  badgeWrapper: { marginTop: SPACING.sm },

  // Cards Base
  card: { marginHorizontal: SPACING.xl, padding: 20, borderRadius: RADIUS.cards, backgroundColor: PALETTE.graphite, marginBottom: SPACING.lg },
  sectionTitle: { ...FONT.h3, fontSize: 18, color: PALETTE.textPrimary, marginBottom: SPACING.lg },
  
  // Timeline Custom
  timelineNode: { flexDirection: 'row', marginBottom: 24, position: 'relative' },
  dot: { width: 12, height: 12, borderRadius: 6, marginTop: 4, marginRight: SPACING.md, zIndex: 2 },
  line: { position: 'absolute', left: 5, top: 16, bottom: -24, width: 2, backgroundColor: PALETTE.steelLine, zIndex: 1 },
  nodeText: { ...FONT.body, color: PALETTE.textPrimary },

  // Detalles Custom
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: PALETTE.steelLine },
  detailKey: { ...FONT.body, color: PALETTE.textSecondary },
  detailValue: { ...FONT.bodyStrong, color: PALETTE.textPrimary },

  // Footer Fijo
  actionFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24, backgroundColor: PALETTE.obsidian, borderTopWidth: 1, borderTopColor: PALETTE.steelLine, gap: 16 },
  buttonWrapper: { flex: 1 },
});

