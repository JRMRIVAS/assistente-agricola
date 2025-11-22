// app/api/plan-siembra/route.ts
import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import type { CropAnalysisInput } from "@/lib/cropAnalysis";
import type { CropPlan } from "@/lib/cropPlan";

export const runtime = "edge";

// 👇 ESTA FUNCIÓN ES LA CLAVE
function cleanJsonFromModel(raw: string): string {
  let text = raw.trim();

  // Si viene con ```json ... ```
  if (text.startsWith("```")) {
    // quita el fence inicial ``` o ```json
    text = text.replace(/^```[a-zA-Z]*\s*/, "");
    // quita el fence final ```
    text = text.replace(/```$/, "").trim();
  }

  return text;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CropAnalysisInput;

    const model = google("gemini-2.0-flash");

    const systemPrompt = `
Eres un agrónomo experto en cultivos del clima tropical de El Salvador.
Debes generar un plan de cultivo sencillo pero útil, usando el siguiente
formato JSON ESTRICTO.

Muy importante:
- NO incluyas ningún texto fuera del JSON.
- No agregues comentarios.
- No inventes propiedades fuera del esquema.
- Usa un lenguaje claro y profesional en español neutro.
- Adapta el contenido a El Salvador y al departamento indicado.

### Esquema ejemplo de salida (JSON):

{
  "sowingDateLabel": "22 nov, 2025",
  "harvestDateLabel": "22 mar, 2026",
  "successRate": 94,
  "events": [
    { "id": "sowing", "label": "Siembra", "dateLabel": "22 nov, 2025" },
    { "id": "germination", "label": "Germinación Estimada", "dateLabel": "29 nov, 2025" },
    { "id": "fertilization1", "label": "Primer Fertilización", "dateLabel": "22 dic, 2025" },
    { "id": "harvest", "label": "Cosecha", "dateLabel": "22 mar, 2026" }
  ],
  "recommendations": {
    "irrigation": "Texto explicando la estrategia de riego.",
    "climate": "Texto sobre clima esperado y riesgos.",
    "soil": "Texto sobre fertilización y manejo del suelo."
  }
}
`;

    const userPrompt = `
Datos de entrada del cultivo (JSON):

${JSON.stringify(body, null, 2)}

Instrucciones específicas:
- País: ${body.country}, departamento: ${body.department}.
- Tipo de suelo: ${body.soilType}.
- Sistema de riego: ${body.irrigation}.
- Altitud: ${body.altitude}.
- Ciclo del cultivo (durationLabel): ${body.durationLabel}.
- Usa la fecha de siembra "sowingDate" como referencia principal.
- Si no tienes datos exactos, usa rangos típicos razonables para El Salvador.

Devuelve ÚNICAMENTE el JSON con el esquema indicado.
`;

    const { text } = await generateText({
      model,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.4,
    });

    // 👇 LIMPIAMOS LOS ```json ... ``` ANTES DE PARSEAR
    const cleaned = cleanJsonFromModel(text);

    let parsed: CropPlan;
    try {
      parsed = JSON.parse(cleaned);
      console.log(parsed);
    } catch (err) {
      console.error("Error al parsear JSON de la IA:", err, "text:", text);
      return NextResponse.json(
        { error: "Error al interpretar la respuesta de la IA" },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error en /api/plan-siembra:", error);
    return NextResponse.json(
      { error: "Error interno al generar el plan" },
      { status: 500 }
    );
  }
}
