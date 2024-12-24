import { AxiosInstance } from "axios";
import api from "./config/axios";
import QueryParams from "../models/queryParams.model";
import Usuario from "../models/user.model";


export class Service {
  static api: AxiosInstance = api("/api");

  static async getUsuarios(queryParams: QueryParams) {
    let link = "/usuarios";

    const res = await this.api.get(link, { params: {...queryParams } });

    return res.data;
  }

  static async createUsuario(usuario: Usuario) {
    const res = await this.api.post("/usuarios", usuario);

    return res;
  }

  static async updateUsuario(id: string, usuario: Usuario) {
    const res = await this.api.put(`/usuarios/${id}`, usuario);

    return res;
  }

  static async deleteUsuario(id: string) {
    const res = await this.api.delete(`/usuarios/${id}`);

    return res;
  }
}
