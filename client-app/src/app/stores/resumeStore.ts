import { observable, action, configure, runInAction } from 'mobx';
import { IResume, IResumeFormValues } from '../models/resume';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class ResumeStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable resumeRegistry = new Map();
    @observable resume: IResume | null = null;
    @observable submitting = false;

    @action getResumes = () => {
        return this.resumeRegistry;
    }

    @action loadResumes = async () => {
        try {
            const resumes = await agent.Resumes.list();
            runInAction(() => {
                resumes.forEach(resume => {
                    this.resumeRegistry.set([resume.offerId, resume.jobSeekerId], resume);
                });
            })
        } catch (error) {
            runInAction(() => {
                console.log(error)
                throw error;
            });
        }
    }

    @action loadResume = async (offerId: string, jobSeekerId: string) => {
        let resume = this.getResume(offerId, jobSeekerId);
        if (resume) {
            this.resume = resume;
            return resume;
        } else {
            try {
                resume = await agent.Resumes.details(offerId, jobSeekerId);
                runInAction(() => {
                    this.resume = resume;
                    this.resumeRegistry.set([resume.offerId, resume.jobSeekerId], resume);
                });
                return resume;
            } catch (error) {
                runInAction(() => {
                    console.log(error);
                    throw error;
                });
            }
        }
    }

    getResume = (offerId: string, jobSeekerId: string) => {
        return this.resumeRegistry.get([offerId, jobSeekerId]);
    }

    @action clearResume = () => {
        this.resume = null;
    } 

    @action createResume = async (resume: IResumeFormValues) => {
        this.submitting = true;
        try {
            await agent.Resumes.create(resume);
            runInAction(() => {
                this.resumeRegistry.set([resume.offerId, resume.jobSeekerId], resume);
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                throw error;
              })
        }
    }
}