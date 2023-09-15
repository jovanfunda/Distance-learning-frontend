import { Lecture } from "./lecture"

export interface Course {
    id: BigInteger,
    name: string;
    fullOwnerName: string;
    pictureURL: string;
    description: string;
    lectures: Lecture[];
}