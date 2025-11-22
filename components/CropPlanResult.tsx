"use client";

import type { Cultivo } from "./CropsCatalog";
import type { CropPlan } from "@/lib/cropPlan";

type CropPlanResultProps = {
  crop: Cultivo;
  plan: CropPlan;
  onBackToSowing: () => void;
  onNewQuery: () => void;
};

export default function CropPlanResult({
  crop,
  plan,
  onBackToSowing,
  onNewQuery,
}: CropPlanResultProps) {
  const sowing = plan.sowingDateLabel;
  const harvest = plan.harvestDateLabel;
  const success = plan.successRate;
  const events = plan.events;
  const rec = plan.recommendations;

  return (
    <section className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <button
        onClick={onBackToSowing}
        className="text-sm text-emerald-600 hover:text-emerald-700 mb-2"
      >
        ← Ajustar fecha de siembra
      </button>

      {/* Encabezado */}
      <div className="text-center space-y-2">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
          ✓
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Planificación Lista
        </h2>
        <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
          Aquí tienes el plan de cultivo optimizado para tu{" "}
          <span className="font-semibold">{crop.name}</span>.
        </p>
      </div>

      {/* Tarjetas principales */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Siembra */}
        <div className="rounded-3xl bg-white shadow-sm border-t-4 border-emerald-500 p-5 flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate-400 uppercase">
            Fecha de Siembra
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900">{sowing}</div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
            📅 Seleccionada en el paso anterior
          </div>
        </div>

        {/* Cosecha */}
        <div className="rounded-3xl bg-emerald-500 text-white shadow-sm p-5 flex flex-col justify-between">
          <div className="text-xs font-semibold uppercase opacity-80">
            Cosecha Estimada
          </div>
          <div className="mt-3 text-2xl font-bold">{harvest}</div>
          <div className="mt-2 text-xs opacity-80">
            Ciclo de {crop.duration}
          </div>
        </div>

        {/* Éxito */}
        <div className="rounded-3xl bg-white shadow-sm p-5 flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate-400 uppercase">
            Probabilidad de Éxito
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div className="text-2xl font-bold text-emerald-600">
              {success}%
            </div>
            <div className="h-10 w-10 rounded-full border-2 border-emerald-500 flex items-center justify-center text-xs text-emerald-500">
              ✔
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            Estimado basado en condiciones ideales.
          </div>
        </div>
      </div>

      {/* Recomendaciones + eventos (texto demo) */}
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span className="text-amber-500 text-lg">ⓘ</span>
            Recomendaciones Clave
          </div>

          <div className="space-y-3">
            <CardRecomendacion
              icon="💧"
              title="Plan de Riego"
              text={rec.irrigation}
              bg="bg-sky-50"
              color="text-sky-500"
            />
            <CardRecomendacion
              icon="☀️"
              title="Condiciones Climáticas"
              text={rec.climate}
              bg="bg-amber-50"
              color="text-amber-500"
            />
            <CardRecomendacion
              icon="🌱"
              title="Nutrición del Suelo"
              text={rec.soil}
              bg="bg-emerald-50"
              color="text-emerald-500"
            />
          </div>
        </div>

        {/* Próximos eventos */}
        <aside className="rounded-3xl bg-slate-900 text-white shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold">Próximos Eventos</h3>
            <div className="mt-4 space-y-4 text-sm">
              {events.map((e, idx) => (
                <TimelineItem
                  key={e.id}
                  color={getEventColor(idx)}
                  date={e.dateLabel} // solo día (como "22")
                  label={e.label}
                />
              ))}
            </div>
          </div>

          <button
            className="mt-6 w-full rounded-2xl bg-white text-slate-900 text-sm font-semibold py-2.5 hover:bg-slate-100 transition"
            onClick={onNewQuery}
            type="button"
          >
            Nueva Consulta
          </button>
        </aside>
      </div>
    </section>
  );
}

function CardRecomendacion({
  icon,
  title,
  text,
  bg,
  color,
}: {
  icon: string;
  title: string;
  text: string;
  bg: string;
  color: string;
}) {
  return (
    <div className="rounded-3xl bg-white shadow-sm p-4 flex gap-3">
      <div
        className={`h-9 w-9 rounded-2xl ${bg} flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 mt-1">{text}</p>
      </div>
    </div>
  );
}

function TimelineItem({
  color,
  date,
  label,
}: {
  color: string;
  date: string;
  label: string;
}) {
  return (
    <div className="flex items-start gap-3 text-xs">
      <div className="flex flex-col items-center">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        <span className="flex-1 w-px bg-white/20 mt-1" />
      </div>
      <div>
        <div className="text-[11px] opacity-70">{date}</div>
        <div className="font-semibold text-white">{label}</div>
      </div>
    </div>
  );
}

function getEventColor(index: number) {
  switch (index) {
    case 0:
      return "bg-emerald-400";
    case 1:
      return "bg-sky-400";
    case 2:
      return "bg-amber-400";
    default:
      return "bg-emerald-500";
  }
}
