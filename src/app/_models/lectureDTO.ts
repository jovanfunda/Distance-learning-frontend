import { SafeResourceUrl } from "@angular/platform-browser";

export interface LectureDTO {
    title: string,
    videoURL: string,
    data: string
    safeURL: SafeResourceUrl;
}