# 🌱 Agricultor Inteligente

**Asistente agrícola moderno con IA (Next.js 16 + Tailwind + Vercel AI
SDK + Gemini)**

Agricultor Inteligente es una plataforma web moderna que permite a
agricultores y visitantes consultar **información confiable sobre
cultivos adaptados al clima de El Salvador**, incluyendo:

-   Fechas estimadas de siembra y cosecha\
-   Calendario de labores\
-   Recomendaciones de riego, fertilización y control de plagas\
-   Consejos adaptados a la zona (occidente, centro, oriente)\
-   Interacción con un asistente agrícola impulsado por IA (Gemini)

El objetivo del proyecto es ofrecer una experiencia moderna, confiable y
simple para agricultores salvadoreños.

------------------------------------------------------------------------

## 🚀 Tecnologías principales

  Tecnología             Uso
  ---------------------- -------------------------------------------------
  **Next.js 16**         Arquitectura, rutas, app router, Server Actions
  **Tailwind CSS v4**    Estilos, diseño responsive y utilidades
  **AI SDK de Vercel**   Manejo del modelo de IA
  **Google Gemini**      Motor de IA generativa
  **TypeScript**         Tipado completo
  **Edge Runtime**       Respuestas más rápidas en la API de IA

------------------------------------------------------------------------

## 📦 Funcionalidades actuales

### ✔️ 1. Catálogo de cultivos

-   Lista de cultivos con información base\
-   Vista de detalle por cultivo\
-   Datos manejados desde JSON o BD (dependiendo fase)

### ✔️ 2. Cálculo de fechas de siembra y cosecha

El usuario: 
1. Selecciona un cultivo\
2. Elige la fecha de siembra\
3. Obtiene:\
- Fecha estimada de cosecha (±1 semana)\
- Calendario mes a mes\
- Eventos importantes del ciclo del cultivo

### ✔️ 3. Recomendaciones agrícolas personalizadas

Incluyen: 
- Preparación del terreno\
- Riego\
- Fertilización\
- Control de plagas y malezas\
- Enfermedades comunes\
- Recomendaciones adaptadas al clima de El Salvador

### ✔️ 4. Asistente de IA (Gemini + AI SDK)

Reglas principales: 
- Solo responde sobre cultivos del catálogo\
- No inventa cultivos o información\
- Adaptado al clima tropical del país\
- Basado en mensajes del usuario + sistema

### ✔️ 5. Interfaz moderna y confiable

-   Diseño limpio y minimalista\
-   Responsive para móvil y escritorio\
-   Tailwind v4 para máximo rendimiento

------------------------------------------------------------------------

## 📁 Estructura del proyecto

    /app
     ├── api/
     │    └── ai/route.ts          → endpoint de IA (Gemini)
     ├── crops/                    → catálogo de cultivos
     ├── sowing/                   → selección de fecha
     ├── result/                   → resultados del plan de cultivo
     └── layout.tsx
    /components
     ├── CropList.tsx
     ├── CropPlanResult.tsx
     └── UI components...
    /lib
     ├── cropPlan.ts               → lógica del plan agrícola
     └── utils.ts
    /schema
     └── cropsCatalog.json         → datos base de cultivos

------------------------------------------------------------------------

## ⚙️ Configuración del entorno

Crear archivo:

    .env.local

Con:

    GOOGLE_API_KEY=tu_clave
    AI_MODEL=gemini-1.5-flash

(O el modelo que prefieras.)

------------------------------------------------------------------------

## 🧠 Endpoint de IA (resumen)

``` ts
import { NextRequest } from 'next/server';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const model = google(process.env.AI_MODEL);

  return streamText({
    model,
    messages,
    system: `
Eres un asistente agrícola experto en cultivos del clima tropical de
El Salvador. Solo responde sobre cultivos del catálogo. No inventes cultivos.
Adapta todas tus recomendaciones al territorio salvadoreño.
`,
  });
}
```

------------------------------------------------------------------------

## ▶️ Cómo correr el proyecto

Instalar dependencias:

    npm install

Modo desarrollo:

    npm run dev

Build producción:

    npm run build

Iniciar producción:

    npm start

------------------------------------------------------------------------

## 🚀 Despliegue

### ✔ Opción recomendada: Vercel

-   Deploy automáticos con GitHub\
-   Edge Functions para IA\
-   Soporte nativo para Next.js 16

Pasos: 1. Subir el repo a GitHub\
2. Crear proyecto en Vercel\
3. Seleccionar la **rama específica** (rrivas, main, dev, etc.)\
4. Configurar variables de entorno\
5. Deploy

### ✔ Posibles Alternativas:

-   Plesk\
-   Railway\
-   VPS Linux\
-   Docker

(El servidor debe soportar Node 18+)

------------------------------------------------------------------------

## 🌾 Visión del proyecto

Agricultor Inteligente busca convertirse en la herramienta más completa
para agricultores salvadoreños, combinando información técnica,
calendarios agrícolas y un asistente IA adaptado al país.

------------------------------------------------------------------------

## 📌 Roadmap (posibles mejoras)

-   [ ] Base de datos (PostgreSQL / Supabase / Mongo)\
-   [ ] Historial de consultas por usuario\
-   [ ] Autenticación más avanzada\
-   [ ] Exportación del calendario en PDF\
-   [ ] PWA Offline\
-   [ ] Integración con clima real (API)\
-   [ ] Más cultivos agregados

------------------------------------------------------------------------

## 👨‍💻 Autor

**Rodrigo Rivas**\
Desarrollador salvadoreño especializado en Next.js, Tailwind y
soluciones web modernas.
