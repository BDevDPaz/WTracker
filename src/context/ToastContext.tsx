// src/context/ToastContext.tsx
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE, RADIUS, SPACING, FONT } from '../constants/theme';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Motores de animación nativos
  const translateY = useSharedValue(-150);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const dismissToast = useCallback(() => {
    translateY.value = withTiming(-150, { duration: 250 }, (finished) => {
      if (finished) {
        opacity.value = 0;
        runOnJS(setMessage)('');
      }
    });
  }, [translateY, opacity]);

  const showToast = useCallback((msg: string, toastType: ToastType = 'info') => {
    // Invalida de forma imperativa colisiones previas encoladas
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setMessage(msg);
    setType(toastType);
    opacity.value = 1;
    
    // Entrada cinestésica elástica
    translateY.value = withSpring(Platform.OS === 'ios' ? 60 : 40, {
      damping: 15,
      stiffness: 120,
    });

    // Temporizador de suspensión antes del repliegue forense
    timerRef.current = setTimeout(() => {
      dismissToast();
    }, 3500);
  }, [translateY, opacity, dismissToast]);

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return { color: PALETTE.successGreen, icon: 'checkmark-circle' as const };
      case 'error':
        return { color: PALETTE.deepRed, icon: 'close-circle' as const };
      case 'warning':
        return { color: PALETTE.amberWarning, icon: 'alert-circle' as const };
      case 'info':
      default:
        return { color: PALETTE.slateBlue, icon: 'information-circle' as const };
    }
  };

  const config = getToastConfig();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Contenedor Flotante del Toast */}
      {message !== '' && (
        <Animated.View style={[styles.toastContainer, animatedStyle]}>
          <View style={[styles.toastCard, { borderColor: config.color }]}>
            <Ionicons name={config.icon} size={22} color={config.color} />
            <Text style={styles.toastText} numberOfLines={3}>
              {message}
            </Text>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser consumido estrictamente dentro de un ToastProvider');
  }
  return context;
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastCard: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: PALETTE.carbonMist,
    borderRadius: RADIUS.inputs,
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    borderWidth: 1,
    alignItems: 'center',
    gap: SPACING.md,
    // Sombras profundas para aislamiento UX
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  toastText: {
    ...FONT.bodyStrong,
    fontSize: 14,
    color: PALETTE.textPrimary,
    flex: 1,
    lineHeight: 18,
  },
});

