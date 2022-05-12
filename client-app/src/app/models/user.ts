export interface IUser{
    id: string;
    username: string;
    token: string;
    email: string;
    photo?: string;
    profile: any;
    role: string;
}

export interface IUserProfile {
    username: string;
    profile: any;
    photo?: string;
    role: string;
}

export interface IUserFormValues {
    id?: string;
    email: string;
    password: string;
    username: string;
    newPassword?: string;
}

export class UserFormValues implements IUserFormValues {
    email: string;
    password: string;
    username: string;
    newPassword?: string;

    constructor(init?: IUserFormValues) {
        Object.assign(this, init);
    }
}

export interface IPhoto{
    id: string;
    url: string;
    name: string;
}