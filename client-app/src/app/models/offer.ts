export interface IOffer {
    id: string;
    publisher: IPublisher;
    title: string;
    category: string;
    location: string;
    schedule: string;
    salary: string;
    exp_Date: Date;
    description: string;
    file: string;
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
    exp_Date?: Date = undefined;
    description: string = '';
    file: string = '';

    constructor(init?: IOfferFormValues) {
        if (init && init.exp_Date) {
            init.time = init.exp_Date;
        }
        Object.assign(this, init);
    }
}

export interface IPublisher {
    username: string;
    name: string;
    description: string;
}

export interface IApplicants {
    id: string;
    firstName: string;
    lastName: string;
    cv: string;
    last_Updated: Date;
}

export interface IReports {
    username: string;
    category: string;
}