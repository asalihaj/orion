import { configure } from "mobx";
import { createContext } from "react";
import CommonStore from "./commonStore";
import CompanyStore from "./companyStore";
import JobSeekerStore from "./jobSeekerStore";
import ModalStore from "./modalStore";
import OfferStore from "./offerStore";
import ResumeStore from "./resumeStore";
import UserStore from "./userStore";

configure({enforceActions: 'always'});

export class RootStore {
    offerStore: OfferStore;
    modalStore: ModalStore;
    userStore: UserStore;
    commonStore: CommonStore;
    companyStore: CompanyStore;
    jobSeekerStore: JobSeekerStore;
    resumeStore: ResumeStore;

    constructor() {
        this.offerStore = new OfferStore(this);
        this.modalStore = new ModalStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.companyStore = new CompanyStore(this);
        this.jobSeekerStore = new JobSeekerStore(this);
        this.resumeStore = new ResumeStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());