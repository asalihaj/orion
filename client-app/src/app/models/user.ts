import { ICompany } from "./company";
import { IOffer } from "./offer";

export interface IUser{
    id: string;
    username: string;
    token: string;
    image?: string;
    profile: ICompany;
    saved: IOffer[];
    role: string;
}

export interface IUserFormValues {
    email: string;
    password: string;
    username: string;
}