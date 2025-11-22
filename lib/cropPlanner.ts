// lib/cropPlanner.ts

export type CropPlanEvent = {
    id: string;
    label: string;
    date: Date;
    dateLabel: string;
};

export type CropPlan = {
    sowingDate: Date;
    sowingDateLabel: string;
    harvestDate: Date;
    harvestDateLabel: string;
    durationDays: number;
    successRate: number;
    events: CropPlanEvent[];
};

const monthNamesShort = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
];

export function formatDateEs(date: Date): string {
    const day = date.getDate().toString().padStart(2, "0");
    const month = monthNamesShort[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
}

// "120-150 días" -> ~135 días
export function parseDurationToDays(duration: string): number {
    const match = duration.match(/(\d+)\s*[-–]\s*(\d+)/);
    if (!match) return 90; // fallback
    const min = Number(match[1]);
    const max = Number(match[2]);
    return Math.round((min + max) / 2);
}

export function calculateCropPlan(
    durationLabel: string,
    sowingDateIso: string
): CropPlan {
    const durationDays = parseDurationToDays(durationLabel);
    const sowingDate = sowingDateIso ? new Date(sowingDateIso) : new Date();

    const harvestDate = new Date(sowingDate);
    harvestDate.setDate(harvestDate.getDate() + durationDays);

    const eventsBase = [
        { id: "sowing", label: "Siembra", offset: 0 },
        { id: "germination", label: "Germinación Estimada", offset: 7 },
        { id: "fertilization", label: "Primer Fertilización", offset: 30 },
        { id: "harvest", label: "Cosecha", offset: durationDays },
    ];

    const events: CropPlanEvent[] = eventsBase.map((e) => {
        const date = new Date(sowingDate);
        date.setDate(date.getDate() + e.offset);
        return {
            id: e.id,
            label: e.label,
            date,
            dateLabel: formatDateEs(date),
        };
    });

    return {
        sowingDate,
        sowingDateLabel: formatDateEs(sowingDate),
        harvestDate,
        harvestDateLabel: formatDateEs(harvestDate),
        durationDays,
        successRate: 94, // fijo de momento
        events,
    };
}
