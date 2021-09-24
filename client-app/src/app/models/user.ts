export interface IUser{
    id: string;
    username: string;
    token: string;
    image?: string;
    profile: any;
    role: string;
}

export interface IUserFormValues {
    email: string;
    password: string;
    username: string;
}