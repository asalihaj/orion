import { observable, action, configure, runInAction } from 'mobx';
import { IOfferResumes, IResume, IResumeFormValues } from '../models/resume';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class ResumeStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable resumeRegistry = new Map();
    @observable offerResumes: IOfferResumes | null = null;
    @observable resume: IResume | null = null;
    @observable submitting = false;
    @observable loadingInitial = false;

    @action getResumes = () => {
        let resumes = new Array();
        this.resumeRegistry.forEach(value => {
            resumes.push(value)
        })
        return resumes;
    }

    @action loadResumes = async () => {
        this.loadingInitial = true;
        try {
            const resumes = await agent.Resumes.list();
            this.resumeRegistry.clear();
            runInAction(() => {
                resumes.forEach(resume => {
                    this.resumeRegistry.set([resume.id], resume);
                    this.loadingInitial = false;
                });
            })
        } catch (error) {
            runInAction(() => {
                console.log(error)
                this.loadingInitial = false;
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
                    this.resumeRegistry.set([resume.offer.id, resume.applicant.id], resume);
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

    @action downloadResumesLink = async (offerId: string) => {
        try {
            let offerResumes = await agent.Resumes.download(offerId);
            return offerResumes;
        } catch (error) {
            runInAction(() => {
                return error;
              })
        }
    }

    getResume = (offerId: string, jobSeekerId: string) => {
        return this.resumeRegistry.get([offerId, jobSeekerId]);
    }

    @action clearResume = () => {
        this.resume = null;
    } 

    @action createResume = async (file: Blob, resume: IResumeFormValues) => {
        this.submitting = true;
        try {
            await agent.Resumes.create(file, resume);
            runInAction(() => {
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
                throw error;
              })
        }
    }
}