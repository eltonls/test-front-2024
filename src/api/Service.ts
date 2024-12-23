import { AxiosInstance } from "axios";
import api from "./config/axios";
import QueryParams from "../models/queryParams.model";


export class Service {
  static api: AxiosInstance = api("/api");

  static async getUsuarios(queryParams: QueryParams) {
    let link = "/usuarios";

    if(queryParams.idadeRange) {
      link = link + `?idade_gte=${queryParams.idadeRange[0]}&idade_lte=${queryParams.idadeRange[1]}`
    }

    const res = await this.api.get(link, { params: {...queryParams, idadeRange: undefined } });
    
    return res.data;
  }

  static async createUsuario(usuario: any) {
  }

  static async updateUsuario(id: string, dados: any) {
  }

  static async deleteUsuario(id: string) {
  }
}
