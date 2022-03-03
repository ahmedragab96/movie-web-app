import { observable, action, computed, makeObservable } from 'mobx';
import { instance as axios } from '../../connections/axios';

export default class AuthStore {
    @observable accessToken: string | undefined;
  
    constructor() {
      makeObservable(this);
      const userJson = localStorage.getItem('currentUser');
      const currentUser = userJson !== null ? JSON.parse(userJson) : null;
      if (currentUser && currentUser.accessToken) {
        this.setAccessToken(currentUser.accessToken);
      }
    }
  
    @computed
    public get isAuthenticated(): boolean {
      return !!this.accessToken;
    }
  
    @action
    public setAccessToken = (token?: string) => {
      this.accessToken = token;
      localStorage.setItem('currentUser', JSON.stringify({
        accessToken: token,
      }));
    }
  
    @action
    public async login(username: string, password: string): Promise<any> {
      try {
        const data = {
          username,
          password,
        };
        const response = await axios.post('/auth/register', data);
        this.setAccessToken(response.data.user.accessToken);
      } catch (error) {
        console.log(error);
      }
    }
  
    @action.bound
    public logout(): void {
      this.setAccessToken();
      localStorage.removeItem('currentUser');
      window.location.reload();
    }  
}
