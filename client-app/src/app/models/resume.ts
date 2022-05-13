import { IOffer } from "./offer";

export interface IResume extends Partial<IOffer> {
    applicants: any;
    applicantList: any;
}

export interface IResumeValues extends Partial<IResume> {
    offer: any;
    applicant: any;
    cv: string;
    name: string;
    lastUpdated: Date;
}

export interface IResumeFormValues {
    offerId: string;
    jobSeekerId: string;
    cv?: Blob;
}

export interface IOfferResumes {
    offerId: string;
    url: string;
}