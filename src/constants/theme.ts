// src/constants/theme.ts

export const PALETTE = {
  // Fondos y Superficies (Dark Mode OLED Deep)
  obsidian: '#0A0A0C',      // Fondo base de la app (Deep Black)
  carbonMist: '#151718',    // Superficies primarias (Tarjetas, Modales)
  graphite: '#1C1E20',      // Superficies secundarias (Inputs, Píldoras)
  steelLine: '#2A2D30',     // Bordes y divisores sutiles

  // Acentos y Marca
  mutedGold: '#D4AF37',     // Acento principal (Elegante, no saturado)
  slateBlue: '#5C7CFA',     // Acento secundario (Información neutra)

  // Estados Semánticos
  successGreen: '#27AE60',  // Validado, Activo, OK
  amberWarning: '#F2994A',  // Asincronías, Alertas, Retrasos
  deepRed: '#EB5757',       // Errores, Eliminación, No Show

  // Tipografía
  textPrimary: '#FFFFFF',   // Títulos y datos clave
  textSecondary: '#A0AAB2', // Subtítulos y contexto
  textMuted: '#68737D',     // Placeholders y notas menores
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  round: 9999,
  cards: 20,
  inputs: 12,
};

export const FONT = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  bodyStrong: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
  },
  label: {
    fontSize: 10,
    fontWeight: '700' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
};

