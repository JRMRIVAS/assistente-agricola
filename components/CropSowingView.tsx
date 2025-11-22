"use client";

import { useState } from "react";
import Image from "next/image";
import type { Cultivo } from "./CropsCatalog";

type CropSowingViewProps = {
    crop: Cultivo;
    onBack: () => void;
    onCalculate?: (params: { crop: Cultivo; sowingDate: string }) => void;
    defaultDate?: string;
};

export default function CropSowingView({
    crop,
    onBack,
    onCalculate,
    defaultDate,
}: CropSowingViewProps) {
    const [sowingDate, setSowingDate] = useState<string>(defaultDate ?? "");

    const handleCalculate = () => {
        if (!sowingDate) {
            alert("Por favor selecciona una fecha de siembra.");
            return;
        }

        if (onCalculate) {
            onCalculate({ crop, sowingDate });
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-6 py-10">
            <button
                onClick={onBack}
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
                ← Volver al catálogo
            </button>

            <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr),minmax(0,1.6fr)] items-start">
                {/* Resumen del cultivo */}
                <div className="rounded-3xl bg-white shadow-sm p-5 flex flex-col gap-4">
                    <div className="text-xs font-semibold text-slate-400 uppercase">
                        Resumen
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-slate-100 h-32">
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

                {/* Calendario + botón */}
                <div className="rounded-3xl bg-white shadow-sm p-7 flex flex-col justify-between min-h-[280px]">
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                            Fecha de Siembra
                        </h2>
                        <p className="mt-2 text-sm text-slate-500 max-w-md">
                            Selecciona la fecha en que planeas iniciar el cultivo para calcular
                            los hitos clave.
                        </p>

                        <div className="mt-8 flex flex-col items-center">
                            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/40 px-6 py-5">
                                <input
                                    type="date"
                                    value={sowingDate}
                                    onChange={(e) => setSowingDate(e.target.value)}
                                    className="rounded-2xl border border-emerald-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
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
