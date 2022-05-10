import { action, computed, observable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { IUser, IUserFormValues, IUserProfile } from "../models/user";
import { RootStore } from "./rootStore";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable user: IUser | null = null;
  @observable userProfile: IUserProfile | null = null;
  @observable loadingInitial = false;

  @computed get isLoggedIn() { return !!this.user}

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      console.log(user);
      history.push('/');
    } catch (error) {
      throw error;
    }
  }

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(user.token);
      return user;
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
      return error;
    }
  }

  @action getProfile = async () => {
    return this.userProfile;
  }

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/')
  }

  @action loadProfile = async (username: string) => {
    this.loadingInitial = true;
    try {
      const user = await agent.User.details(username);
      runInAction(() => {
        this.userProfile = user;
        this.loadingInitial = false;  
      });
      return user;
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
      return error;
    }
  }
}
