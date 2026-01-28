export interface Spool {
    spoolId: number;
    filamentName: string;
    vendorName: string;
    material: string;
    colorHex?: string;
    multiColorHexes?: string;
    price: number;
    remainingWeight: number;
    remainingValue: number;
}