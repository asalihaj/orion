import { IOffer } from "./offer";

export interface IReport {
    offer: any;
    username: string;
    category: string;
    lastUpdated: string;
}

export class IReportFormValues {
    offerId: string;
    userId: string;
    category: string;
}