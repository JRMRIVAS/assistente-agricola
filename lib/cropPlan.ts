export type CropPlanEvent = {
    id: string;
    label: string;
    dateLabel: string; // fecha corta y legible, ej: "22 nov, 2025"
};

export type CropPlanRecommendations = {
    irrigation: string; // Plan de riego
    climate: string;    // Condiciones climáticas
    soil: string;       // Manejo de suelo / fertilización
};

export type CropPlan = {
    sowingDateLabel: string;   // texto formateado de la fecha de siembra
    harvestDateLabel: string;  // texto formateado de la fecha de cosechas
    successRate: number;       // 0–100 (% aproximado)

    events: CropPlanEvent[];
    recommendations: CropPlanRecommendations;
};
