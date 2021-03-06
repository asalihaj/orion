import { action, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IContact, IContactFormValues } from "../models/contact";
import { RootStore } from "./rootStore";

export default class ContactStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable contactList = new Map();
    @observable contact: IContact | null = null;
    @observable loadingInitial = false;

    @action getContacts = () => {
        let contacts = new Array();
        this.contactList.forEach(contact => contacts.push(contact));
        return contacts;
    }

    @action getContact = (id: string) => {
        return this.contactList.get(id);
    }

    @action get = async (id: string) => {
        try {
            const contact = await agent.Contacts.details(id);
            runInAction(() => {
                this.contact = contact;
            })
        } catch (error) {
            runInAction(() => {
                throw error;
            });
        }
    }

    @action loadContacts =async () => {
        this.loadingInitial = true;
        try {
            const contacts = await agent.Contacts.list();
            runInAction(() => {
                contacts.forEach(contact => {
                    this.contactList.set(contact.id, contact);
                });
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
                throw error;
            });
        }
    }

    @action loadContact = async (id: string) => {
        let contact = this.getContact(id);
        if (contact) {
          this.contact = contact;
          return contact;
        } else {
          try {
            contact = await agent.Offers.details(id);
            runInAction(() => {
              this.contact = contact;
              this.contactList.set(contact.id, contact);
            });
            return contact;
          } catch (error) {
            runInAction(() => {
              throw error;
            });
          }
        }
    }

    @action clearContact = () => {
        this.contact = null;
    }

    @action createContact =async (contact: IContactFormValues) => {
        this.loadingInitial = true;
        try {
            await agent.Contacts.create(contact);
            runInAction(() => {
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
                throw error;
            })
        }
    } 

    

}