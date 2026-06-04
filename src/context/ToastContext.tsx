// src/context/ToastContext.tsx
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { PALETTE, RADIUS, FONT, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

type ToastType = 'success' | 'info';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastItem | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    // Regla de Saturación Visual: Limpiamos el toast anterior si entra uno nuevo rápido
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast({ id: Date.now().toString(), message, type });

    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    // Auto-ocultar después de 3 segundos
    timeoutRef.current = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setToast(null));
    }, 3000);
  }, [fadeAnim]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
          <View style={[styles.toastContent, toast.type === 'success' ? styles.borderSuccess : styles.borderInfo]}>
            <Ionicons 
              name={toast.type === 'success' ? 'checkmark-circle' : 'information-circle'} 
              size={20} 
              color={toast.type === 'success' ? PALETTE.successGreen : PALETTE.mutedGold} 
            />
            {/* Restricción UX: numberOfLines={2} garantiza máximo 1.5 líneas */}
            <Text style={styles.toastText} numberOfLines={2}>{toast.message}</Text>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast debe usarse dentro de un ToastProvider');
  return context;
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 90, // Se ancla justo por encima de la Tab Bar
    left: SPACING.xl,
    right: SPACING.xl,
    zIndex: 9999,
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.obsidian,
    borderRadius: RADIUS.pills,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    gap: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  borderSuccess: { borderColor: PALETTE.successGreen },
  borderInfo: { borderColor: PALETTE.mutedGold },
  toastText: {
    ...FONT.body,
    color: PALETTE.textPrimary,
    flex: 1,
  },
});

