import { string } from "yup";

export interface IOffer {
    id: string;
    publisher: IPublisher;
    title: string;
    category: string;
    location: string;
    schedule: string;
    salary: string;
    expDate: Date;
    description: string;
    applicants: IApplicants[];
    reports: IReports[];
}

export interface IOfferFormValues extends Partial<IOffer> {
    time?: Date;
}

export class OfferFormValues implements IOfferFormValues {
    id?: string = undefined;
    publisher?: IPublisher;
    title: string = '';
    category: string = '';
    location: string = '';
    schedule: string = '';
    salary: string = '';
    time?: Date = undefined;
    expDate?: Date = undefined;
    description: string = '';

    constructor(init?: IOfferFormValues) {
        if (init && init.expDate) {
            init.time = init.expDate;
        }
        Object.assign(this, init);
    }
}

export interface IPublisher {
    id: string;
    username: string;
    name: string;
}

export interface IApplicants {
    id: string;
    firstName: string;
    lastName: string;
    cv: string;
    lastUpdated: Date;
}

export interface IReports {
    username: string;
    category: string;
}