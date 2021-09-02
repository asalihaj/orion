import { ICompany } from "./company";
import { IJobSeeker } from "./jobseeker";
import { IOffer } from "./offer";

export interface IUser{
    id: string;
    username: string;
    token: string;
    image?: string;
    profile: ICompany;
    saved: IOffer[];
}

export interface IUserFormValues {
    email: string;
    password: string;
    username?: string;
}