import { action, computed, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
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
  @observable loadingProfile = false;

  @computed get isLoggedIn() { return !!this.user}

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      history.push('/');
    } catch (error) {
      throw error;
    }
  }

  @action returnProfile = () => {
    let profile: IUserProfile = {
      username: this.userProfile.username,
      profile: this.userProfile.profile,
      photo: this.userProfile.photo,
      role: this.userProfile.role
    }
    return profile;
  }

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @action getUser = async () => {
    this.loadingProfile = true;
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
        this.loadingProfile = false;
      })
    } catch (error) {
      this.loadingProfile = false;
      throw error;
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
    this.loadingProfile = true;
    try {
      const user = await agent.User.details(username);
      runInAction(() => {
        this.userProfile = user;
        this.loadingProfile = false;  
      });
      return user;
    } catch (error) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      return error;
    }
  }

  @action editUser = async (user: IUserFormValues) => {
    try {
      const updatedUser = await agent.User.update(user);
      runInAction(() => {
        this.user = updatedUser;
      });
    } catch (error) {
      runInAction(() => {
        throw error;
      })
    }
  }

  @action uploadPhoto = async (file: Blob) => {
    this.loadingInitial = true;
    try {
      const photo = await agent.User.uploadPhoto(file);
      runInAction(() => {
        if (this.user) {
          this.user.photo = photo.url;
          this.loadingInitial = false;
        }
      })
    } catch (error) {
      console.log(error)
      toast.error('Problem uploading photo');
      runInAction(() => {
        this.loadingInitial = false;
      })
    }
  }

  @action deletePhoto = async (id: string) => {
    try {
      await agent.User.deletePhoto(id);
      runInAction(() => {
        this.user.photo = null;
      })
    } catch (error) {
      runInAction(() => {
        throw error;
      })
    }
  }
}
