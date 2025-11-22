export type CropAnalysisInput = {
    cropId: string;
    cropName: string;
    durationLabel: string;
    sowingDate: string; // ISO (yyyy-mm-dd)

    country: string; // "El Salvador"
    department: string; // Sonsonate, Santa Ana, etc.

    soilType: string;    // franco, arenoso, etc.
    irrigation: string;  // secano, goteo, etc.
    altitude: string;    // baja, media, alta

    areaHa?: number;     // opcional, área del lote en ha
};
