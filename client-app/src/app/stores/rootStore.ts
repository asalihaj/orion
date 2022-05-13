import { configure } from "mobx";
import { createContext } from "react";
import CommonStore from "./commonStore";
import CompanyStore from "./companyStore";
import ContactStore from "./contactStore";
import JobSeekerStore from "./jobSeekerStore";
import ModalStore from "./modalStore";
import OfferStore from "./offerStore";
import ReportStore from "./reportStore";
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
    reportStore: ReportStore;
    contactStore: ContactStore;
    
    constructor() {
        this.offerStore = new OfferStore(this);
        this.modalStore = new ModalStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.companyStore = new CompanyStore(this);
        this.jobSeekerStore = new JobSeekerStore(this);
        this.resumeStore = new ResumeStore(this);
        this.reportStore = new ReportStore(this);
        this.contactStore = new ContactStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());