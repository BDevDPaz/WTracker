// src/components/ui/LoadingOverlay.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE, RADIUS, SPACING, FONT } from '../../constants/theme';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  isReconnecting?: boolean;
}

export function LoadingOverlay({ 
  visible, 
  message = 'Cargando sistema...', 
  isReconnecting = false 
}: LoadingOverlayProps) {
  
  const rotation = useSharedValue(0);
  const pulseOpacity = useSharedValue(1);

  useEffect(() => {
    if (visible) {
      // Bucle infinito de rotación matemática limpia para el spinner ordinario
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
      
      // Bucle de radar de advertencia para pérdidas de enlace (reconexión)
      if (isReconnecting) {
        pulseOpacity.value = withRepeat(
          withTiming(0.4, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          -1,
          true
        );
      }
    } else {
      rotation.value = 0;
      pulseOpacity.value = 1;
    }
  }, [visible, isReconnecting]);

  // Estilos vinculados al hilo nativo de UI
  const animatedSpinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const animatedPulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <View style={styles.container}>
        {/* Fondo oscuro OLED Deep con opacidad controlada */}
        <Animated.View entering={FadeIn.duration(250)} style={styles.backdrop} />
        
        {/* Ventana de Información Central */}
        <View style={styles.contentCard}>
          {isReconnecting ? (
            <Animated.View style={[styles.radarWrapper, animatedPulseStyle]}>
              <Ionicons name="cloud-offline" size={28} color={PALETTE.amberWarning} />
            </Animated.View>
          ) : (
            <View style={styles.spinnerWrapper}>
              <Animated.View style={[styles.spinnerRing, animatedSpinnerStyle]} />
            </View>
          )}
          
          <Text style={[
            styles.messageText, 
            isReconnecting && { color: PALETTE.amberWarning, fontWeight: '700' }
          ]}>
            {isReconnecting ? 'Reconectando señal...' : message}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 10, 12, 0.92)', // Basado estrictamente en PALETTE.obsidian
  },
  contentCard: {
    backgroundColor: PALETTE.carbonMist,
    paddingVertical: SPACING.xl,
    paddingHorizontal: 32,
    borderRadius: RADIUS.cards,
    borderWidth: 1,
    borderColor: PALETTE.steelLine,
    alignItems: 'center',
    gap: SPACING.lg,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  spinnerWrapper: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: 'rgba(212, 175, 55, 0.15)', // Canal alfa del acento oro
    borderTopColor: PALETTE.mutedGold, // Extremo asimétrico del indicador
  },
  radarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(242, 153, 74, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    ...FONT.body,
    fontSize: 14,
    color: PALETTE.textSecondary,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});

