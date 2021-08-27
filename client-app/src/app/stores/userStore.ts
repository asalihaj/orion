import { action, computed, observable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { IOffer } from "../models/offer";
import { IUser, IUserFormValues } from "../models/user";
import { RootStore } from "./rootStore";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable user: IUser | null = null;

  @computed get isLoggedIn() { return !!this.user}

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      console.log(user)
      this.rootStore.commonStore.setToken(user.token);
      history.push('/');
    } catch (error) {
      throw error;
    }
  }
  @action register = async (values: IUserFormValues) => {
    try {
    const user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(user.token);
      history.push('/offers')
    } catch (error) {
      throw error;
    }
  }

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      })
    }catch (error) {
      console.log(error);
    }
  }

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/')
  }
}
