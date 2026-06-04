// app/_layout.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ToastProvider } from '../src/context/ToastContext';
import { PALETTE, SPACING, FONT } from '../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  // Guardián de Rehidratación (Boot Sequence)
  const [isRehydrating, setIsRehydrating] = useState(true);

  useEffect(() => {
    // Simulador del motor SQLite local y recuperación de estado
    // En producción, aquí despachas la acción que lee el último estado del GPS/BD
    const bootTimer = setTimeout(() => {
      setIsRehydrating(false);
    }, 2500); // 2.5 segundos de bloqueo seguro

    return () => clearTimeout(bootTimer);
  }, []);

  return (
    <ToastProvider>
      <StatusBar style="light" /> 
      
      {/* Navegación Base */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      {/* Capa de Rehidratación Global (Splash Extendida) */}
      {/* Se superpone a toda la app protegiendo contra renders prematuros */}
      {isRehydrating && (
        <View style={styles.rehydrationOverlay}>
          <View style={styles.iconContainer}>
            <Ionicons name="shield-checkmark" size={48} color={PALETTE.mutedGold} />
          </View>
          <Text style={styles.title}>W Tracker</Text>
          <Text style={styles.subtitle}>Restaurando sesión segura...</Text>
          
          <ActivityIndicator 
            size="small" 
            color={PALETTE.mutedGold} 
            style={{ marginTop: SPACING.xl }} 
          />
        </View>
      )}
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  rehydrationOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: PALETTE.obsidian,
    zIndex: 99999, // Inmunidad de superposición
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: PALETTE.carbonMist,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
    shadowColor: PALETTE.mutedGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: PALETTE.textPrimary,
    marginBottom: SPACING.xs,
    letterSpacing: -0.5,
  },
  subtitle: {
    ...FONT.body,
    color: PALETTE.textSecondary,
    letterSpacing: 0.5,
  }
});

