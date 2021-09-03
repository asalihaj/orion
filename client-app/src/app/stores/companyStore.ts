import { action, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { ICompany } from "../models/company";
import { IUser } from "../models/user";
import { RootStore } from "./rootStore";

export default class CompanyStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable company: ICompany | null = null;

    @action get = async (user: IUser) => {
        try {
            const company = await agent.Company.details(user.id);
            runInAction(() => {
                this.company = company;
            });
        } catch (error) {
            throw error;
        }
    }

    @action getCompany = () => {
        return this.company;
    }

    @action create = async (company: ICompany) => {
        try {
            await agent.Company.create(company);
        } catch (error) {
            throw error;
        }
    }

    @action edit = async (company: ICompany) => {
        try {
            await agent.Company.update(company);
        } catch (error) {
            throw error;
        }
    }

    @action delete = async (id: string) => {
        try {
            await agent.Company.delete(id);
        } catch (error) {
            throw error;
        }
    }
}