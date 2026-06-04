// src/constants/theme.ts

export const PALETTE = {
  // Fondos y Superficies
  obsidian: '#050505',      // Level 0: Fondo principal absoluto[span_1](start_span)[span_1](end_span)
  graphite: '#121212',      // Level 1: Superficies base (Tarjetas opacas)[span_2](start_span)[span_2](end_span)
  carbonMist: '#1A1A1A',    // Level 2: Superficies elevadas (Modales, Hero)[span_3](start_span)[span_3](end_span)
  
  // Bordes y Accent
  steelLine: '#2A2A2A',     // Bordes y divisores (Stroke)[span_4](start_span)[span_4](end_span)
  mutedGold: '#C5A059',     // Firma de W Tracker. ÚNICO CTA[span_5](start_span)[span_5](end_span)
  
  // Estados (Semántica visual)
  successGreen: '#2E7D32',  // Éxito operativo[span_6](start_span)[span_6](end_span)
  amberWarning: '#F57C00',  // Advertencias accionables[span_7](start_span)[span_7](end_span)
  deepRed: '#C62828',       // Error crítico/bloqueante[span_8](start_span)[span_8](end_span)
  slateBlue: '#455A64',     // Información neutra del sistema[span_9](start_span)[span_9](end_span)
  
  // Textos (Basados en contraste del Documento 1)
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1AA',
  textMuted: '#6B7280',
} as const;

export const FONT = {
  h1: { fontSize: 32, fontWeight: '700' as const }, // Títulos de pantalla[span_10](start_span)[span_10](end_span)
  h2: { fontSize: 28, fontWeight: '700' as const }, // Subsecciones principales[span_11](start_span)[span_11](end_span)
  h3: { fontSize: 22, fontWeight: '600' as const }, // Títulos de Cards[span_12](start_span)[span_12](end_span)
  body: { fontSize: 16, fontWeight: '400' as const }, // Texto general[span_13](start_span)[span_13](end_span)
  bodyStrong: { fontSize: 16, fontWeight: '600' as const }, // Texto destacado[span_14](start_span)[span_14](end_span)
  caption: { fontSize: 12, fontWeight: '400' as const }, // Metadatos, horas[span_15](start_span)[span_15](end_span)
  label: { 
    fontSize: 10, 
    fontWeight: '700' as const, 
    letterSpacing: 2, 
    textTransform: 'uppercase' as const 
  }, // Badges[span_16](start_span)[span_16](end_span)
} as const;

export const SPACING = {
  xs: 4,   // Micro-ajustes[span_17](start_span)[span_17](end_span)
  sm: 8,   // Separación ícono/texto[span_18](start_span)[span_18](end_span)
  md: 12,  // Elementos de lista[span_19](start_span)[span_19](end_span)
  lg: 16,  // Padding interno de Cards estándar[span_20](start_span)[span_20](end_span)
  xl: 24,  // Separación entre secciones[span_21](start_span)[span_21](end_span)
  xxl: 32, // Márgenes de layout principal[span_22](start_span)[span_22](end_span)
} as const;

export const RADIUS = {
  inputs: 16, // Campos de texto y botones estándar[span_23](start_span)[span_23](end_span)
  cards: 24,  // Contenedores de información (Level 1)[span_24](start_span)[span_24](end_span)
  modals: 28, // Diálogos y Bottom Sheets (Level 2)[span_25](start_span)[span_25](end_span)
  pills: 999, // Badges y micro-estados[span_26](start_span)[span_26](end_span)
} as const;

