export interface IUser{
    id: string;
    username: string;
    token: string;
    photo?: string;
    profile: any;
    role: string;
}

export interface IUserFormValues {
    email: string;
    password: string;
    username: string;
}