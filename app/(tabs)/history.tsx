import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE, RADIUS, SPACING, FONT } from '../../src/constants/theme';
import { IntegrityBadge, BadgeType } from '../../src/components/ui/IntegrityBadge';

const MOCK_HISTORY = [
  {
    id: '101',
    date: 'Hoy, 04 jun',
    destination: 'Taller central - Revisión',
    time: '08:14 AM - 04:30 PM',
    hours: '8.2 h',
    earnings: '$164.00',
    status: 'valid' as BadgeType,
  },
  {
    id: '102',
    date: 'Ayer, 03 jun',
    destination: 'Residencia norte',
    time: '09:00 AM - 01:15 PM',
    hours: '4.2 h',
    earnings: '$84.00',
    status: 'auto' as BadgeType,
  },
  {
    id: '103',
    date: '02 jun 2026',
    destination: 'Oficinas Nexus',
    time: '07:30 AM - 06:00 PM',
    hours: '10.5 h',
    earnings: '$230.00',
    status: 'manual' as BadgeType,
  },
  {
    id: '104',
    date: '01 jun 2026',
    destination: 'Destino no especificado',
    time: '08:00 AM - 05:00 PM',
    hours: '9.0 h',
    earnings: '$180.00',
    status: 'error' as BadgeType,
  },
  {
    id: '105',
    date: '30 may 2026',
    destination: 'Taller central',
    time: '08:00 AM - 12:00 PM',
    hours: '4.0 h',
    earnings: '$80.00',
    status: 'warning' as BadgeType,
  },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HistoryScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'Todos' | 'Semana' | 'Mes'>('Todos');

  const renderItem = ({ item, index }: any) => {
    return (
      <AnimatedPressable
        entering={FadeInDown.delay(index * 100 + 200).springify().damping(20)}
        style={({ pressed }: { pressed: boolean }) => [
          styles.sessionCard,
          {
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
          item.status === 'error' && styles.errorCard,
        ]}
        onPress={() => router.push(`/session/${item.id}`)}
      >
        <View style={styles.cardTopRow}>
          <Text style={styles.sessionDate}>{item.date}</Text>
          <IntegrityBadge type={item.status} />
        </View>

        <View style={styles.destinationRow}>
          <Ionicons name="location-outline" size={16} color={PALETTE.textSecondary} />
          <Text
            style={[
              styles.destinationTitle,
              item.status === 'error' && styles.errorText,
            ]}
            numberOfLines={1}
          >
            {item.destination}
          </Text>
        </View>

        <Text style={styles.timeText}>{item.time}</Text>

        <View style={styles.cardBottomRow}>
          <View style={styles.metricRow}>
            <Ionicons name="time-outline" size={14} color={PALETTE.textSecondary} />
            <Text style={styles.hoursText}>{item.hours}</Text>
          </View>

          <View style={styles.metricRow}>
            <Ionicons name="cash-outline" size={14} color={PALETTE.mutedGold} />
            <Text
              style={[
                styles.earningsText,
                item.status === 'error' && styles.errorText,
              ]}
            >
              {item.earnings}
            </Text>
          </View>
        </View>
      </AnimatedPressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <View style={styles.headerRow}>
          <Ionicons name="time-outline" size={22} color={PALETTE.textPrimary} />
          <Text style={styles.headerTitle}>Historial</Text>
        </View>

        <Text style={styles.headerSubtitle}>Actividad registrada</Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(100).duration(400)}
        style={styles.filterContainer}
      >
        {['Todos', 'Semana', 'Mes'].map((f) => (
          <Pressable
            key={f}
            style={[
              styles.filterPill,
              filter === f && styles.filterPillActive,
            ]}
            onPress={() => setFilter(f as any)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}
            >
              {f}
            </Text>
          </Pressable>
        ))}
      </Animated.View>

      <FlatList
        data={MOCK_HISTORY}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={styles.footerSpacing} />}
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
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: PALETTE.textPrimary,
  },

  headerSubtitle: {
    fontSize: 12,
    color: PALETTE.textSecondary,
    marginTop: 4,
  },

  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
    gap: SPACING.sm,
  },

  filterPill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: RADIUS.round,
    backgroundColor: PALETTE.graphite,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
  },

  filterPillActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderColor: PALETTE.mutedGold,
  },

  filterText: {
    ...FONT.bodyStrong,
    color: PALETTE.textSecondary,
    fontSize: 14,
  },

  filterTextActive: {
    color: PALETTE.mutedGold,
  },

  scrollContent: {
    paddingHorizontal: SPACING.xl,
  },

  sessionCard: {
    backgroundColor: PALETTE.carbonMist,
    borderRadius: RADIUS.cards,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
  },

  errorCard: {
    borderColor: PALETTE.deepRed,
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },

  sessionDate: {
    ...FONT.label,
    color: PALETTE.textSecondary,
  },

  destinationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },

  destinationTitle: {
    ...FONT.h3,
    fontSize: 18,
    color: PALETTE.textPrimary,
    flex: 1,
  },

  errorText: {
    color: PALETTE.deepRed,
  },

  timeText: {
    ...FONT.body,
    color: PALETTE.textSecondary,
    marginBottom: SPACING.md,
  },

  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: PALETTE.graphite,
  },

  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  hoursText: {
    ...FONT.bodyStrong,
    color: PALETTE.textPrimary,
  },

  earningsText: {
    fontSize: 16,
    fontWeight: '700',
    color: PALETTE.mutedGold,
  },

  footerSpacing: {
    height: 40,
  },
});
