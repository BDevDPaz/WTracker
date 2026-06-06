import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from '../src/context/ToastContext';
import { LoadingOverlay } from '../src/components/ui/LoadingOverlay';
import { PALETTE } from '../src/constants/theme';

export default function RootLayout() {
  const [isRehydrating, setIsRehydrating] = useState(true);

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsRehydrating(false);
    }, 2500);

    return () => clearTimeout(bootTimer);
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: PALETTE.obsidian }}>
      <ToastProvider>
        <StatusBar style="light" translucent backgroundColor="transparent" />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: PALETTE.obsidian },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen
            name="session/[id]"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>

        <LoadingOverlay
          visible={isRehydrating}
          message="Restaurando la sesión..."
          isReconnecting={false}
        />
      </ToastProvider>
    </SafeAreaProvider>
  );
}
