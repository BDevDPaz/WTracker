// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE } from '../../src/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Quitamos el header nativo porque construiremos los nuestros custom
        // tal como indican los Blueprints de cada pantalla
        headerShown: false, 
        
        // Estilos estrictos del Tab Bar
        tabBarStyle: {
          backgroundColor: PALETTE.graphite,       // Superficie oscura sólida (Level 1)[span_30](start_span)[span_30](end_span)
          borderTopWidth: 1,                       // Borde Superior: 1px[span_31](start_span)[span_31](end_span)
          borderTopColor: PALETTE.steelLine,       // Color: steelLine[span_32](start_span)[span_32](end_span)
          height: Platform.OS === 'ios' ? 88 : 72, // Altura total: 72px - 76px (Ajuste iOS)[span_33](start_span)[span_33](end_span)
          paddingHorizontal: 16,                   // Padding Horizontal: 16px[span_34](start_span)[span_34](end_span)
          paddingTop: 8,                           // Padding Vertical Interno: Top 8px[span_35](start_span)[span_35](end_span)
          paddingBottom: Platform.OS === 'ios' ? 28 : 10, // Bottom 10px[span_36](start_span)[span_36](end_span)
          elevation: 0,                            // Remueve sombras erráticas en Android
        },
        
        // Mapeo de Estados Visuales
        tabBarActiveTintColor: PALETTE.mutedGold,  // Activo: mutedGold[span_37](start_span)[span_37](end_span)
        tabBarInactiveTintColor: PALETTE.textMuted,// Inactivo: Gris humo[span_38](start_span)[span_38](end_span)
        
        // Composición del Ítem (Label)
        tabBarLabelStyle: {
          fontSize: 10,                            // Tamaño 10px - 11px[span_39](start_span)[span_39](end_span)
          textTransform: 'uppercase',              // text-transform: uppercase[span_40](start_span)[span_40](end_span)
          fontWeight: '700',
          letterSpacing: 0.5,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hoy',
          tabBarIcon: ({ color }) => <Ionicons name="grid" size={22} color={color} />, // Tamaño 20px - 22px[span_41](start_span)[span_41](end_span)
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <Ionicons name="time" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Reportes',
          tabBarIcon: ({ color }) => <Ionicons name="document-text" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

