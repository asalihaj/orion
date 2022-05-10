export interface IUser{
    id: string;
    username: string;
    token: string;
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
    email: string;
    password: string;
    username: string;
}