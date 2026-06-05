// app/(tabs)/history.tsx
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
import { PALETTE, RADIUS, SPACING, FONT } from '../../src/constants/theme';
import { IntegrityBadge, BadgeType } from '../../src/components/ui/IntegrityBadge';

const MOCK_HISTORY = [
  {
    id: '101',
    date: 'Hoy, 04 Jun',
    destination: 'Taller Central - Revisión',
    time: '08:14 AM - 04:30 PM',
    hours: '8.2 h',
    earnings: '$164.00',
    status: 'valid' as BadgeType,
  },
  {
    id: '102',
    date: 'Ayer, 03 Jun',
    destination: 'Cliente: Residencia Norte',
    time: '09:00 AM - 01:15 PM',
    hours: '4.2 h',
    earnings: '$84.00',
    status: 'auto' as BadgeType,
  },
  {
    id: '103',
    date: '02 Jun 2026',
    destination: 'Oficinas Nexus',
    time: '07:30 AM - 06:00 PM',
    hours: '10.5 h',
    earnings: '$230.00',
    status: 'manual' as BadgeType,
  },
  {
    id: '104',
    date: '01 Jun 2026',
    destination: 'Sin nombre (Desconocido)',
    time: '08:00 AM - 05:00 PM',
    hours: '9.0 h',
    earnings: '$180.00',
    status: 'error' as BadgeType,
  },
  {
    id: '105',
    date: '30 May 2026',
    destination: 'Taller Central',
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

        <Text
          style={[
            styles.destinationTitle,
            item.status === 'error' && styles.errorText,
          ]}
          numberOfLines={1}
        >
          {item.destination}
        </Text>

        <Text style={styles.timeText}>{item.time}</Text>

        <View style={styles.cardBottomRow}>
          <Text style={styles.hoursText}>{item.hours}</Text>
          <Text
            style={[
              styles.earningsText,
              item.status === 'error' && styles.errorText,
            ]}
          >
            {item.earnings}
          </Text>
        </View>
      </AnimatedPressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <Text style={styles.headerTitle}>Historial</Text>
        <Text style={styles.headerSubtitle}>REGISTROS FORENSES</Text>
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
    borderWidth: 1,
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

  destinationTitle: {
    ...FONT.h3,
    fontSize: 18,
    color: PALETTE.textPrimary,
    marginBottom: 4,
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

