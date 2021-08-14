import { IOffer } from "./offer";

export interface IUser{
    id: string;
    username: string;
    token: string;
    image?: string;
    saved: IOffer[];
}

export interface IUserFormValues {
    email: string;
    password: string;
    username?: string;
}

export interface Saved {
    saved: IOffer[];
}