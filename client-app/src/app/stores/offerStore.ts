import { observable, action, computed, configure, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IOffer } from '../models/offer';
import agent from '../api/agent';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class OfferStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
    }
    @observable offerRegistry = new Map();
    @observable offer: IOffer | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable userSaved = new Map();

    @computed get offersByDate() {
      return this.groupOffersByDate(Array.from(this.offerRegistry.values()));
    }

    @computed get savedOffers() {
      return this.groupOffersByDate(Array.from(this.userSaved.values()));
    }

    @action getOffers = () => {
      let offers = new Array();
      this.offerRegistry.forEach(offer => offers.push(offer))
      return offers;
    }

    @action loadSavedOffers = async () => {
      try {
        const user = await agent.User.current();
        runInAction(() => {
          user.saved.forEach(o => {
            o.expDate = new Date(o.expDate!);
            this.userSaved.set(o.id, o);
          })
        })
      } catch (error) {
        console.log(error);
      }
    }

    groupOffersByDate(offers: IOffer[]) {
        const sortedOffers = offers.sort(
          (a, b) => a.expDate.getTime() - b.expDate.getTime()
        );
        return Object.entries(sortedOffers.reduce((offers, offer) => {
          const date = offer.expDate.toISOString().split('T')[0];
          offers[date] = offers[date] ? [...offers[date], offer] : [offer];
          return offers;
        }, {} as {[key: string]: IOffer[]}));
      }
    
      @action loadOffers = async () => {
        this.loadingInitial = true;
        try {
          const offers = await agent.Offers.list();
          runInAction(() => {
            offers.forEach(offer => {
              offer.expDate = new Date(offer.expDate!);
              this.offerRegistry.set(offer.id, offer);
            });
            this.loadingInitial = false;
          });
        } catch (error) {
          runInAction(() => {
            this.loadingInitial = false;
          })
        }
      };

      @action loadOffer = async (id: string) => {
        let offer = this.getOffer(id);
        if (offer) {
          this.offer = offer;
          return offer;
        } else {
          this.loadingInitial = true;
          try {
            offer = await agent.Offers.details(id);
            runInAction(() => {
              offer.expDate = new Date(offer.expDate);
              this.offer = offer;
              this.offerRegistry.set(offer.id, offer);
              this.loadingInitial = false;
            });
            return offer;
          } catch (e) {
            runInAction(() => {
              this.loadingInitial = false;
            });
            console.log(e);
          }
        }
      }
    
      @action clearOffer = () => {
        this.offer = null;
      }
    
      getOffer = (id: string) => {
        return this.offerRegistry.get(id);
      }
    
      @action createOffer = async (offer: IOffer) => {
        this.submitting = true;
        try {
          await agent.Offers.create(offer);
          runInAction(() => {
            this.offerRegistry.set(offer.id, offer);
            this.submitting = false;
          });
          // history.push(`/offers/${offer.id}`);
        } catch (error) {
          runInAction(() => {
            this.submitting = false;
          })
          console.log(error);
        }
      };
    
      @action editOffer = async (offer: IOffer) => {
        this.submitting = true;
        try {
          await agent.Offers.update(offer);
          console.log(offer.title + " :: " + offer.salary);
          runInAction(() => {
            this.offerRegistry.set(offer.id, offer);
            this.offer = offer;
            this.submitting = false;
          });
        } catch (error) {
          runInAction(() => {
            this.submitting = false;
          })
          console.log(error);
        }
      };
    
      @action deleteOffer = async (id: string) => {
        this.submitting = true;
        try {
          await agent.Offers.delete(id);
          runInAction(() => {
            this.offerRegistry.delete(id);
            this.submitting = false;
          })
        } catch (error) {
          console.log(error);
        }
      };
    
}