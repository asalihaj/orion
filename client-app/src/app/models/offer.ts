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
    applicants: number;
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
    expDate?: Date = undefined;
    time?: Date = undefined;
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