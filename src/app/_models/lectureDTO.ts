import { SafeResourceUrl } from "@angular/platform-browser";

export interface LectureDTO {
    id: BigInteger,
    title: string,
    videoURL: string,
    data: string,
    hasTest: boolean,
    testFinished: boolean,
    testStartDate: Date,
    score: number,
    safeURL: SafeResourceUrl
}