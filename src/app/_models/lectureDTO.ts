import { SafeResourceUrl } from "@angular/platform-browser";

export interface LectureDTO {
    title: string,
    videoUrl: string,
    data: string
    safeURL: SafeResourceUrl;
}