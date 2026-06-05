// app/session/[id].tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeInDown, SlideInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { PALETTE, RADIUS, SPACING, FONT } from '../../src/constants/theme';
import { useToast } from '../../src/context/ToastContext';
import { IntegrityBadge } from '../../src/components/ui/IntegrityBadge';
import { Button } from '../../src/components/ui/Button';
import { EditSessionModal } from '../../src/components/modals/EditSessionModal';
import { DeleteSessionModal } from '../../src/components/modals/DeleteSessionModal';

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const { showToast } = useToast();

  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const sessionId = String(id ?? '');

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const handleSaveEdit = () => {
    setIsEditVisible(false);
    showToast('Registro forense actualizado', 'success');
  };

  const handleConfirmDelete = () => {
    setIsDeleteVisible(false);
    showToast('Registro eliminado del sistema', 'error');
    setTimeout(() => {
      router.back();
    }, 500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="close" size={28} color={PALETTE.textPrimary} />
        </Pressable>

        <Text style={styles.headerTitle}>Detalle de Sesión</Text>

        <View style={styles.headerSpacer} />
      </Animated.View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInDown.delay(100).springify().damping(20)}
          style={styles.heroBlock}
        >
          <View style={styles.heroTopRow}>
            <Text style={styles.dateText}>04 Jun 2026</Text>
            <IntegrityBadge type="valid" />
          </View>

          <Text style={styles.destinationText}>Taller Central - Revisión</Text>
          <Text style={styles.idText}>ID: TRK-{sessionId}-88A</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200).springify().damping(20)}
          style={styles.metricsGrid}
        >
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Horas Netas</Text>
            <Text style={styles.metricValue}>8.2 h</Text>
          </View>

          <View style={[styles.metricCard, styles.highlightMetricCard]}>
            <Text style={styles.metricLabel}>Total Estimado</Text>
            <Text style={[styles.metricValue, styles.highlightMetricValue]}>
              $164.00
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(300).springify().damping(20)}
          style={styles.timelineBlock}
        >
          <Text style={styles.sectionTitle}>Registro de Eventos</Text>

          <View style={styles.timelineNode}>
            <View style={[styles.nodeDot, styles.nodeDotStart]} />
            <View style={styles.nodeLine} />
            <View style={styles.nodeContent}>
              <Text style={styles.nodeTitle}>Jornada Iniciada</Text>
              <Text style={styles.nodeTime}>08:14 AM • GPS Confirmado</Text>
            </View>
          </View>

          <View style={styles.timelineNode}>
            <View style={[styles.nodeDot, styles.nodeDotArrival]} />
            <View style={styles.nodeLine} />
            <View style={styles.nodeContent}>
              <Text style={styles.nodeTitle}>Llegada al Destino</Text>
              <Text style={styles.nodeTime}>08:45 AM • Geo-fence Auto</Text>
            </View>
          </View>

          <View style={styles.timelineNode}>
            <View style={[styles.nodeDot, styles.nodeDotClose]} />
            <View style={styles.nodeContent}>
              <Text style={styles.nodeTitle}>Cierre de Jornada</Text>
              <Text style={styles.nodeTime}>04:30 PM • Cierre Manual</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <Animated.View
        entering={SlideInDown.delay(400).springify().damping(20)}
        style={styles.actionFooter}
      >
        <Button
          label="Ajustar Registro"
          variant="secondary"
          onPress={() => setIsEditVisible(true)}
          style={{ flex: 1 }}
        />

        <Button
          label="Eliminar"
          variant="danger"
          onPress={() => setIsDeleteVisible(true)}
          style={{ width: 100 }}
        />
      </Animated.View>

      <EditSessionModal
        visible={isEditVisible}
        onCancel={() => setIsEditVisible(false)}
        onSave={handleSaveEdit}
      />

      <DeleteSessionModal
        visible={isDeleteVisible}
        onCancel={() => setIsDeleteVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PALETTE.obsidian,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },

  backButton: {
    padding: 4,
    marginLeft: -4,
  },

  headerTitle: {
    ...FONT.h3,
    fontSize: 18,
    color: PALETTE.textPrimary,
  },

  headerSpacer: {
    width: 28,
  },

  scrollContent: {
    paddingHorizontal: SPACING.xl,
  },

  heroBlock: {
    backgroundColor: PALETTE.carbonMist,
    borderRadius: RADIUS.cards,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
  },

  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  dateText: {
    ...FONT.bodyStrong,
    color: PALETTE.textSecondary,
  },

  destinationText: {
    fontSize: 22,
    fontWeight: '700',
    color: PALETTE.textPrimary,
    marginBottom: SPACING.xs,
  },

  idText: {
    ...FONT.caption,
    color: PALETTE.textMuted,
  },

  metricsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },

  metricCard: {
    flex: 1,
    backgroundColor: PALETTE.graphite,
    padding: SPACING.lg,
    borderRadius: RADIUS.cards,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
  },

  highlightMetricCard: {
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
    borderColor: PALETTE.mutedGold,
  },

  metricLabel: {
    ...FONT.caption,
    color: PALETTE.textSecondary,
    marginBottom: SPACING.xs,
  },

  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: PALETTE.textPrimary,
  },

  highlightMetricValue: {
    color: PALETTE.mutedGold,
  },

  timelineBlock: {
    backgroundColor: PALETTE.carbonMist,
    borderRadius: RADIUS.cards,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
  },

  sectionTitle: {
    ...FONT.h3,
    fontSize: 16,
    color: PALETTE.textPrimary,
    marginBottom: SPACING.xl,
  },

  timelineNode: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    position: 'relative',
  },

  nodeContent: {
    flex: 1,
  },

  nodeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 4,
    marginRight: SPACING.md,
    zIndex: 2,
  },

  nodeDotStart: {
    backgroundColor: PALETTE.mutedGold,
  },

  nodeDotArrival: {
    backgroundColor: PALETTE.successGreen,
  },

  nodeDotClose: {
    backgroundColor: PALETTE.carbonMist,
    borderColor: PALETTE.steelLine,
    borderWidth: 1,
  },

  nodeLine: {
    position: 'absolute',
    left: 6,
    top: 18,
    bottom: -24,
    width: 2,
    backgroundColor: PALETTE.steelLine,
    zIndex: 1,
  },

  nodeTitle: {
    ...FONT.bodyStrong,
    color: PALETTE.textPrimary,
  },

  nodeTime: {
    ...FONT.caption,
    color: PALETTE.textSecondary,
    marginTop: 4,
  },

  bottomSpacer: {
    height: 100,
  },

  actionFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: SPACING.md,
    padding: SPACING.xl,
    paddingBottom: Platform.OS === 'ios' ? 40 : SPACING.xl,
    backgroundColor: PALETTE.obsidian,
    borderTopWidth: 1,
    borderTopColor: PALETTE.steelLine,
  },
});

