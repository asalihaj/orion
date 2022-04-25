import { action, observable } from "mobx";
import agent from "../api/agent";
import { IJobSeeker, JobSeekerFormValues } from "../models/jobseeker";
import { RootStore } from "./rootStore";

export default class JobSeekerStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable jobSeeker: IJobSeeker | null = null;

    @action get = async (id: string) => {
        try {
            await agent.JobSeeker.details(id);
        } catch (error) {
            throw error;
        }
    }

    @action create = async (jobSeeker: JobSeekerFormValues) => {
        try {
            await agent.JobSeeker.create(jobSeeker);
        } catch (error) {
            throw error;
        }
    }

    @action edit = async (jobSeeker: IJobSeeker) => {
        try {
            await agent.JobSeeker.update(jobSeeker);
        } catch (error) {
            throw error;
        }
    }

    @action delete = async (id: string) => {
        try {
            await agent.JobSeeker.delete(id);
        } catch (error) {
            throw error;
        }
    }

    @action save = async (id: string) => {
        try {
            await agent.JobSeeker.save(id);
        } catch (error) {
            throw error;
        }
    }

    @action remove = async (id: string) => {
        try {
            await agent.JobSeeker.remove(id);
        } catch (error) {
            throw error;
        }
    }
}