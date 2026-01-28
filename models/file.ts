import { FileType } from "./FileType";

export interface File {
    fileId: number;
    fileType: FileType;
    path: string;
    weight?: number;
    repeatations?: number;
    electricityCostg?: number;
    size: number,
    url?: string,
    //TODO: fix this shit when there is internet
    printTime?: string;
}