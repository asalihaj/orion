export interface ICompany {
    id: string;
    name: string;
    location: string;
    description?: string;
}

export interface ICompanyFormValues extends Partial<ICompany> {
    id: string;
    name: string;
    location: string;
    description?: string;
}