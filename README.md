# W Tracker - Control Diario

**W Tracker** es una aplicación móvil de nivel empresarial diseñada para el rastreo autónomo de tiempo, geocercado (geofencing) y auditoría forense de jornadas laborales. 

Construida con una estricta arquitectura de inmutabilidad de datos y un sistema de diseño propio (*Design System*), la aplicación garantiza que el trabajador mantenga un registro exacto y a prueba de fallos de sus horas y ubicaciones.

## 🏗️ Arquitectura y Stack Tecnológico
- **Framework:** React Native + Expo (Expo Router)
- **Lenguaje:** TypeScript (Estricto)
- **UI/UX:** Sistema de diseño modular basado en directivas arquitectónicas personalizadas (Obsidian, Carbon Mist, Muted Gold).
- **Gestión de Estado:** Arquitectura de Máquina de Estados para flujos operativos y resiliencia de hardware.

## 🚀 Estado Actual del Proyecto: Fase 1 (Completada)
La Capa Visual y de Resiliencia (Frontend) está 100% finalizada. Esto incluye:
- [x] Máquina de estados del rastreador GPS (Nodos de viaje, Asincronía, Fallos Críticos).
- [x] Motor de Intercepción (Modales de configuración, salida y almuerzo).
- [x] Trazabilidad Forense (Línea de tiempo inmutable y auditoría de edición).
- [x] Sistema Global de Notificaciones (Cola de Toasts efímeros).
- [x] Simulación de Casos Límite (Edge-Case Mocking) para validación de UX.

## 🛠️ Entorno de Desarrollo
Desarrollado íntegramente en un entorno móvil mediante **Termux** y **NVIM**.

## 📖 Instrucciones de ejecución
Para levantar el entorno de desarrollo en Expo:
```bash
npm install
npx expo start -c

