"use client";

import Image from "next/image";
import { useState } from "react";
import cropsData from "@/data/crops.json";
import { motion } from "motion/react";
import CropSowingView from "./CropSowingView";
import CropPlanResult from "./CropPlanResult";
import { calculateCropPlan, type CropPlan } from "@/lib/cropPlanner";

export type Cultivo = {
    id: string;
    name: string;
    image: string;
    duration: string;
    climate: string;
    soil: string;
    water: string;
};

const crops = cropsData as Cultivo[];

export default function CropsCatalog() {
    const [selectedCrop, setSelectedCrop] = useState<Cultivo | null>(null);
    const [plan, setPlan] = useState<CropPlan | null>(null);
    const [lastSowingDate, setLastSowingDate] = useState<string>("");

    // 3) Vista RESULTADO (Planificación Lista)
    if (selectedCrop && plan) {
        return (
            <CropPlanResult
                crop={selectedCrop}
                plan={plan}
                onBackToSowing={() => setPlan(null)}
                onNewQuery={() => {
                    setPlan(null);
                    setSelectedCrop(null);
                    setLastSowingDate("");
                }}
            />
        );
    }

    // 2) Vista CALENDARIO + RESUMEN del cultivo
    if (selectedCrop) {
        return (
            <CropSowingView
                crop={selectedCrop}
                onBack={() => setSelectedCrop(null)}
                defaultDate={lastSowingDate}
                onCalculate={({ crop, sowingDate }) => {
                    setLastSowingDate(sowingDate);
                    const result = calculateCropPlan(crop.duration, sowingDate);
                    setPlan(result);
                }}
            />
        );
    }

    // 1) Vista GRID (catálogo)
    return (
        <section className="max-w-6xl mx-auto px-6 py-10">
            <header className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Catálogo de Cultivos
                </h2>
                <p className="mt-2 text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
                    Selecciona un cultivo para iniciar el análisis y obtener
                    recomendaciones personalizadas.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {crops.map((crop) => (
                    <motion.div
                        key={crop.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="group cursor-pointer h-full"
                    >
                        <article
                            className="group flex flex-col rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition cursor-pointer"
                            onClick={() => setSelectedCrop(crop)}
                        >
                            <div className="relative h-40 md:h-44">
                                <Image
                                    src={crop.image}
                                    alt={crop.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform"
                                />
                            </div>

                            <div className="flex flex-col flex-1 p-5">
                                <h3 className="text-base md:text-lg font-semibold text-slate-900">
                                    {crop.name}
                                </h3>

                                <div className="mt-3 space-y-2 text-xs md:text-sm text-slate-600">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-2">
                                            ⏱ <span>{crop.duration}</span>
                                        </span>
                                        <span className="inline-flex items-center gap-2">
                                            🌡 <span>{crop.climate}</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-2">
                                            🌱 <span>{crop.soil}</span>
                                        </span>
                                        <span className="inline-flex items-center gap-2">
                                            💧 <span>{crop.water}</span>
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className="mt-4 w-full rounded-2xl bg-emerald-50 text-emerald-600 text-xs md:text-sm font-medium py-2.5 border border-emerald-50 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition"
                                    type="button"
                                >
                                    Seleccionar Cultivo
                                </button>
                            </div>
                        </article>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
