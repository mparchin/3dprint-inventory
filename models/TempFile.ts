import { FileType } from "./FileType";

export interface TempFile {
    path: string,
    name: string,
    progress: number,
    size: number,
    inputFileIndex: number,
    fileType?: FileType,
    fileId: number,
    url?: string,
    weight?: number;
    repeatations?: number;
    electricityCostg?: number;
    printTime?: string;
}