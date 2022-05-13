export interface IContact {
    id: string;
    user: any;
    title: string;
    description: string;
    lastUpdated: string;
}

export interface IContactFormValues {
    id: string;
    email: string;
    title: string;
    description: string;
}