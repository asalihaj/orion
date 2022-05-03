import { IOffer } from "./offer";

export interface IReport {
    offer: IOffer;
    username: string;
    category: string;
    lastUpdated: string;
}

export class IReportFormValues {
    offerId: string;
    userId: string;
    category: string;
}