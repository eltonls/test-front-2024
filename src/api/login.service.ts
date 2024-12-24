import { AxiosInstance } from "axios";
import api from "./config/axios";


export class LoginService {
  static api: AxiosInstance = api("/api");

  static async login(user: string, password: string): Promise<any> {
    const res = await this.api.get(`/login?usuario=${user}&senha=${password}`);

    if(res.data.length > 0) {
      return res.data[0];
    } else {
      return Promise.reject();
    }
  }
}
