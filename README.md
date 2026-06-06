# WTracker v2.1.0 (Gold Master)

Sistema avanzado de control de jornadas, seguimiento de tiempos y estimación de ganancias diseñado para entornos operativos e industriales. Construido con una arquitectura modular y un enfoque estricto en la fluidez de la interfaz y la confiabilidad de los datos.

---

## Características Principales

* **Motor de Estados Operativos:** Gestión del flujo de trabajo a través de estados finitos (`NO_INICIADA`, `ESPERANDO_LLEGADA`, `ASINCRONIA_CHECKIN`, `ACTIVA`, `SALIDA_DETECTADA`, `CERRADA`) para un control preciso del estatus del operario en el terreno.
* **Cálculo de Ganancias en Tiempo Real:** Integración de tarifas base y multiplicadores de horas extra.
* **Control de Asistencia y Geometría Espacial:** Detección de llegadas, salidas de zona y manejo de asincronía en las señales de GPS.
* **Gestión de Jornadas:** Edición manual con validación de integridad (`IntegrityBadge`), eliminación de registros y registro de descansos/almuerzos.
* **Generación de Reportes:** Resúmenes semanales detallados y simulación de exportación de documentos para auditoría de tiempos.
* **Seguridad de Parámetros:** Bloqueo mediante PIN cifrado (SHA-256) para proteger la configuración de tarifas y permisos de la aplicación.

---

## Arquitectura y Stack Tecnológico

WTracker v2.1 se apoya en los principios de **Feature-Sliced Design (FSD)** y **Domain-Driven Design (DDD)** para separar responsabilidades y garantizar un código altamente mantenible.

* **Framework Base:** React Native (v0.74) + Expo (v51)
* **Lenguaje:** TypeScript (Tipado estricto)
* **Enrutamiento:** Expo Router (Navegación basada en archivos y Layouts)
* **Animaciones:** React Native Reanimated (v3) utilizando motores de físicas de resortes (`springify`).
* **Gestión de Estado y Contexto:** React Context API para inyección global de dependencias (`ThemeContext`, `ToastContext`).
* **Feedback Háptico:** Expo Haptics para confirmaciones físicas de las acciones en pantalla.

---

## Sistema de Diseño: Luxury Glass Dark

La interfaz gráfica abandona los componentes estáticos para abrazar un ecosistema dinámico e inyectable, caracterizado por una estética *premium* e industrial:

* **Inyección Dinámica (`useTheme`):** Todos los componentes, pantallas y modales consumen colores en tiempo de ejecución, eliminando el acoplamiento a paletas rígidas.
* **Paleta de Colores:** Basada en tonos profundos (`obsidian`, `carbonMist`, `graphite`) contrastados con acentos de alta legibilidad (`mutedGold`, `successGreen`, `amberWarning`).
* **Físicas Centralizadas (`animations.ts`):** Todas las transiciones de diseño y apariciones de componentes responden a un único objeto de configuración de resortes, garantizando una identidad kinestésica uniforme en toda la app.
* **Iconografía Centralizada (`icons.ts`):** Un único diccionario maestro para gestionar los glifos de la aplicación, facilitando la consistencia en el Bottom Tab Navigator y las acciones de sistema.

---

## Estructura de Directorios

La estructura de carpetas refleja la separación por dominios y capas de la interfaz de usuario:

```text
wtracker/
├── app/                        # Expo Router: Rutas y Layouts de pantalla
│   ├── _layout.tsx             # Root Layout (Inyección de Providers globales)
│   ├── (tabs)/                 # Bottom Tab Navigator
│   │   ├── _layout.tsx         # Layout tematizado de pestañas
│   │   ├── index.tsx           # Vista principal (HoyScreen)
│   │   ├── history.tsx         # Historial de jornadas
│   │   ├── report.tsx          # Resumen y reportes semanales
│   │   └── settings.tsx        # Configuración y seguridad
│   └── session/                # Rutas dinámicas
│       └── [id].tsx            # Detalle, edición y eliminación de jornada
├── src/
│   ├── components/
│   │   ├── modals/             # Modales interactivos (DailySetup, Lunch, etc.)
│   │   └── ui/                 # Componentes atómicos y de bloque (ScreenContainer, HeroCard, etc.)
│   ├── constants/              # Fuentes de verdad inmutables
│   │   ├── animations.ts       # Físicas de Reanimated
│   │   ├── icons.ts            # Diccionario de iconografía
│   │   └── theme.ts            # Tokens de diseño (Radios, Espaciados, Tipografía)
│   └── context/                # Proveedores de estado global
│       ├── ThemeContext.tsx    # Motor de inyección cromática
│       └── ToastContext.tsx    # Sistema de notificaciones flotantes
├── package.json
├── tsconfig.json
└── babel.config.js             # Configuración de plugins (Reanimated)

```
## Entorno de Desarrollo
El proyecto está optimizado para flujos de trabajo en consola y entornos minimalistas de alto rendimiento.
**Requisitos previos:**
 * Node.js (v18+)
 * Gestor de paquetes: npm o yarn
**Flujo recomendado en Termux + Neovim:**
Para aquellos que desarrollan en movilidad utilizando un entorno Termux en Android con Neovim (nvim v0.12.2 o superior):
 1. Clona el repositorio y navega al directorio del proyecto:
   ```bash
   git clone <repositorio>
   cd wtracker
   
   ```
 2. Instala las dependencias:
   ```bash
   npm install
   
   ```
 3. Inicia el servidor de desarrollo de Expo:
   ```bash
   npm start
   
   ```
 4. Para abrir el proyecto en Neovim con tu configuración actual y gestores de LSP (TypeScript/React):
   ```bash
   nvim .
   
   ```
> **Nota para el desarrollo:** Asegúrate de limpiar el caché de la empaquetadora (npm start -- -c) si realizas cambios estructurales en babel.config.js o agregas nuevos plugins de Reanimated.
> 
## Estado del Proyecto
**Fase Actual:** Producción / Gold Master
El código base ha sido refactorizado en su totalidad para eliminar la deuda técnica asociada al acoplamiento de estilos rígidos. Todos los componentes de la capa de presentación ahora se adhieren estrictamente al contexto global.

