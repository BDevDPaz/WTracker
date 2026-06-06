// src/constants/icons.ts
import { Ionicons } from '@expo/vector-icons';

export const ICONS = {
  // Navegación
  tabs: {
    home: { active: 'grid', inactive: 'grid-outline' },
    history: { active: 'time', inactive: 'time-outline' },
    report: { active: 'document-text', inactive: 'document-text-outline' },
    settings: { active: 'settings', inactive: 'settings-outline' },
  },

  // Estados del sistema (alineado con EngineState)
  state: {
    inactive: 'moon-outline',
    location: 'location',
    locationOutline: 'location-outline',
    warning: 'alert-circle-outline',
    error: 'warning',
    pin: 'pin-outline',
  },

  // Acciones
  actions: {
    delete: 'trash-bin',
    edit: 'create-outline',
    close: 'close',
    back: 'arrow-back',
    share: 'share-outline',
    email: 'mail-outline',
  },

  // Documentos
  document: {
    file: 'document-text',
    preview: 'eye-outline',
  },

  // Sistema
  system: {
    success: 'checkmark-circle',
    error: 'close-circle',
    warning: 'alert-circle',
    info: 'information-circle',
  },
} as const;

