# Registro de Deuda Técnica y Backlog (TECH_DEBT)

Este documento registra los simuladores de interfaz (Mocks) inyectados durante la Fase 1 del Frontend, los cuales deben ser reemplazados por lógica de negocio real (Backend/APIs nativas) en la Fase 2.

## 1. Persistencia de Datos (Motor SQLite)
- **Estado Actual:** Los estados (`isDirty`, listas de historial, configuraciones) viven en la memoria RAM (useState) y se pierden al recargar.
- **Solución Pendiente:** Implementar `expo-sqlite` para crear una base de datos local con tablas para `Sessions`, `Logs` y `Settings`. Crear un servicio de lectura/escritura asíncrono.

## 2. Geofencing y Rastreo en Segundo Plano
- **Estado Actual:** El cambio de estados del GPS y las salidas de zona se simulan mediante botones y un flujo programado en `OperationalHeroCard.tsx`.
- **Solución Pendiente:** Integrar `expo-location` y `expo-task-manager`. Configurar la escucha de coordenadas en segundo plano (Background Fetch) y vincular la máquina de estados a la distancia real entre la latitud actual y el destino.

## 3. Generación y Exportación de PDFs
- **Estado Actual:** El botón "Generar reporte" en `report.tsx` simula una carga de 1.5s mediante un `setTimeout`.
- **Solución Pendiente:** Integrar `expo-print` para transformar el HTML de la factura en un archivo PDF real, y `expo-sharing` para abrir el menú nativo del dispositivo y enviar el archivo.

## 4. Componentes Nativos de Interfaz
- **Estado Actual:** El `EditSessionModal.tsx` utiliza `TextInput` genéricos para ingresar horas (ej. "04:56 PM").
- **Solución Pendiente:** Reemplazar estos inputs por la librería `@react-native-community/datetimepicker` para invocar el selector de hora nativo (rueda de iOS / reloj de Android), evitando errores de formato por parte del usuario.

## 5. Guardia de Rehidratación Real
- **Estado Actual:** El Root Guard en `_layout.tsx` bloquea la pantalla por exactamente 2.5 segundos de forma artificial.
- **Solución Pendiente:** Vincular el desvanecimiento del Root Guard a la Promesa de inicialización de la base de datos SQLite.
