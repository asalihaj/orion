import { IOffer } from "./offer";

export interface IJobSeeker {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: Date;
    bio: string;
    url: string;
    saved: string;
    offersApplied: IOffer[];
}

export interface IJobSeekerFormValues {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    bio: string
    birthday: Date;
}