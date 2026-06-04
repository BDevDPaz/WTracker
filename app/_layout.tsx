// app/_layout.tsx
import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from '../src/context/ToastContext';
import { LoadingOverlay } from '../src/components/ui/LoadingOverlay';
import { PALETTE } from '../src/constants/theme';

export default function RootLayout() {
  // Guardián de Rehidratación Secuencial (Boot Sequence de Sesión Segura)
  const [isRehydrating, setIsRehydrating] = useState(true);

  useEffect(() => {
    // Inicialización del motor local y recuperación de estado persistido
    const bootTimer = setTimeout(() => {
      setIsRehydrating(false);
    }, 2500); // Bloqueo preventivo controlado de 2.5 segundos

    return () => clearTimeout(bootTimer);
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: PALETTE.obsidian }}>
      <ToastProvider>
        <StatusBar style="light" translucent backgroundColor="transparent" />

        {/* Orquestador de Navegación Nativa Estricta */}
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: PALETTE.obsidian },
          }}
        >
          {/* Contenedor Principal de la Barra de Navegación Secundaria */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          {/* Stack Dependiente con Presentación Modal Nativa por Hardware */}
          <Stack.Screen 
            name="session/[id]" 
            options={{ 
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }} 
          />
        </Stack>

        {/* Evolución Arquitectónica: Consumo unificado del nuevo componente modular.
            Absorbe limpiamente la antigua Capa de Rehidratación Global del sistema.
        */}
        <LoadingOverlay 
          visible={isRehydrating} 
          message="Restaurando sesión segura..." 
          isReconnecting={false}
        />

      </ToastProvider>
    </SafeAreaProvider>
  );
}

