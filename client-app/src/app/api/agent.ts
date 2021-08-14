import axios, { AxiosResponse } from 'axios';
import { history } from '../..';
import { toast } from 'react-toastify';
import { ICompany } from '../models/company';
import { IOffer } from '../models/offer';
import { IUser, IUserFormValues } from '../models/user';

axios.defaults.baseURL = 'http://localhost:5000/api';
    
axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;

}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(undefined, error => {
    if(error.message === 'Network Error' && !error.response) {
        toast.error('Network error');
    }
    const {status, data, config} = error.response;
    if(status === 404) {
        history.push('/notfound');
    }
    if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound');
    }
    if(status === 500) {
        toast.error('Server error - check the terminal for more info!');
    }
    
    throw error.response;
});

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(sleep(400)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(400)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(400)).then(responseBody),
    delete: (url: string) => axios.delete(url).then(sleep(400)).then(responseBody)
}

const Offers = {
    list: (): Promise<IOffer[]> => requests.get('/offers'),
    details: (id: string) => requests.get(`/offers/${id}`),
    create: (offer: IOffer) => requests.post('/offers', offer),
    update: (offer: IOffer) => requests.put(`/offers/${offer.id}`, offer),
    delete: (id: string) => requests.delete(`/offers/${id}`)
};

const User = {
    currnt: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user)
};

const Companies = {
    list: (): Promise<ICompany[]> => requests.get('/companies'),
    details: (id: string) => requests.get(`/companies/${id}`),
    create: (company: ICompany) => requests.post('/companies', company),
    update: (company: ICompany) => requests.put(`/companies/${company.userId}`, company),
    delete: (id: string) => requests.delete(`/companies/${id}`)
}

export default {
    Offers,
    User,
    Companies
}