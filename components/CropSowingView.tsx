"use client";

import { useState } from "react";
import Image from "next/image";
import type { Cultivo } from "./CropsCatalog";
import type { CropAnalysisInput } from "@/lib/cropAnalysis";

type CropSowingViewProps = {
    crop: Cultivo;
    onBack: () => void;
    defaultDate?: string;
    onCalculate?: (payload: CropAnalysisInput) => void;
};

const DEPARTAMENTOS_SV = [
    "Ahuachapán",
    "Santa Ana",
    "Sonsonate",
    "Chalatenango",
    "La Libertad",
    "San Salvador",
    "Cuscatlán",
    "La Paz",
    "Cabañas",
    "San Vicente",
    "Usulután",
    "San Miguel",
    "Morazán",
    "La Unión",
];

const SOIL_TYPES = [
    "Franco",
    "Franco-arcilloso",
    "Franco-limoso",
    "Arenoso",
    "Humífero",
];

const IRRIGATION_TYPES = [
    "Secano (solo lluvia)",
    "Goteo",
    "Aspersión",
    "Gravedad / Surcos",
];

const ALTITUDE_LEVELS = [
    "Baja (0-600 msnm)",
    "Media (600-1200 msnm)",
    "Alta (>1200 msnm)",
];

export default function CropSowingView({
    crop,
    onBack,
    defaultDate,
    onCalculate,
}: CropSowingViewProps) {
    const [sowingDate, setSowingDate] = useState<string>(defaultDate ?? "");
    const [department, setDepartment] = useState<string>("");
    const [soilType, setSoilType] = useState<string>("");
    const [irrigation, setIrrigation] = useState<string>("");
    const [altitude, setAltitude] = useState<string>("");
    const [areaHa, setAreaHa] = useState<string>("");

    const handleCalculate = () => {
        if (!sowingDate) {
            alert("Por favor selecciona una fecha de siembra.");
            return;
        }
        if (!department) {
            alert("Por favor selecciona el departamento.");
            return;
        }

        const payload: CropAnalysisInput = {
            cropId: crop.id,
            cropName: crop.name,
            durationLabel: crop.duration,
            sowingDate,

            country: "El Salvador",
            department,
            soilType: soilType || "No especificado",
            irrigation: irrigation || "No especificado",
            altitude: altitude || "No especificado",
            areaHa: areaHa ? Number(areaHa) : undefined,
        };

        if (onCalculate) {
            onCalculate(payload);
        } else {
            // Por ahora solo para debug
            console.log("Payload listo para IA:", payload);
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-10">
            <button
                onClick={onBack}
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
                ← Volver al catálogo
            </button>

            <div className="grid gap-6 lg:grid-cols-2 items-start">
                {/* Resumen del cultivo */}
                <div className="rounded-3xl bg-white shadow-sm p-5 flex flex-col gap-4">
                    <div className="text-xs font-semibold text-slate-400 uppercase">
                        Resumen
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-slate-100 h-48">
                        <div className="relative w-full h-full">
                            <Image
                                src={crop.image}
                                alt={crop.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="text-[10px] font-semibold text-slate-400 uppercase">
                        Cultivo
                    </div>
                    <div className="text-sm font-semibold text-emerald-600">
                        {crop.name}
                    </div>

                    <div className="mt-1 text-[10px] font-semibold text-slate-400 uppercase">
                        Ciclo estimado
                    </div>
                    <div className="text-sm text-slate-700">{crop.duration}</div>

                    <button
                        type="button"
                        onClick={onBack}
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                    >
                        ← Cambiar Cultivo
                    </button>
                </div>

                {/* Panel derecho: calendario + filtros adicionales */}
                <div className="rounded-3xl bg-white shadow-sm p-7 flex flex-col gap-8">
                    {/* Fecha de siembra */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                            Fecha de Siembra
                        </h2>
                        <p className="mt-2 text-sm text-slate-500 max-w-md">
                            Selecciona la fecha y las condiciones de tu lote para generar un
                            análisis más preciso del plan de cultivo.
                        </p>

                        <div className="mt-6 flex flex-col items-center">
                            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/40 px-6 py-5">
                                <input
                                    type="date"
                                    value={sowingDate}
                                    onChange={(e) => setSowingDate(e.target.value)}
                                    className="rounded-2xl border border-emerald-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                                />
                                <p className="text-sm text-center mt-5">selecciona una fecha</p>
                            </div>
                        </div>
                    </div>

                    {/* Campos adicionales */}
                    <div className="grid gap-4 md:grid-cols-2 text-sm">
                        {/* País (fijo) */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500">
                                País
                            </label>
                            <select
                                value="El Salvador"
                                disabled
                                className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500"
                            >
                                <option>El Salvador</option>
                            </select>
                            <span className="text-[11px] text-slate-400">
                                Por ahora el asistente está optimizado para El Salvador.
                            </span>
                        </div>

                        {/* Departamento */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500">
                                Departamento
                            </label>
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                            >
                                <option value="">Selecciona un departamento</option>
                                {DEPARTAMENTOS_SV.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tipo de suelo */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500">
                                Tipo de suelo
                            </label>
                            <select
                                value={soilType}
                                onChange={(e) => setSoilType(e.target.value)}
                                className="rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                            >
                                <option value="">No especificar</option>
                                {SOIL_TYPES.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sistema de riego */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500">
                                Sistema de riego
                            </label>
                            <select
                                value={irrigation}
                                onChange={(e) => setIrrigation(e.target.value)}
                                className="rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                            >
                                <option value="">No especificar</option>
                                {IRRIGATION_TYPES.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Altitud */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500">
                                Altitud aproximada
                            </label>
                            <select
                                value={altitude}
                                onChange={(e) => setAltitude(e.target.value)}
                                className="rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                            >
                                <option value="">No especificar</option>
                                {ALTITUDE_LEVELS.map((a) => (
                                    <option key={a} value={a}>
                                        {a}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Área del lote */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500">
                                Área del lote (ha)
                            </label>
                            <input
                                type="number"
                                min={0}
                                step={0.01}
                                value={areaHa}
                                onChange={(e) => setAreaHa(e.target.value)}
                                placeholder="Ej. 2.5"
                                className="rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                            />
                        </div>
                    </div>

                    {/* Botón calcular */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCalculate}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold shadow-md bg-emerald-500 text-white hover:bg-emerald-600 transition"
                        >
                            Calcular Cosecha
                            <span>→</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
