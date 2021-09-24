import { IOffer } from "./offer";

export interface IJobSeeker {
    userId: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: Date;
    saved: string;
    offersApplied: IOffer[];
}

export class JobSeekerFormValues {
    userId: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: Date;
}