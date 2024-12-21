import { AxiosInstance } from "axios";
import api from "./config/axios";


export class Service {
  static api: AxiosInstance = api("/api");

  static async getUsuarios() {
    const res = await this.api.get("/usuarios");
    
    return res.data;
  }

  static async createUsuario(usuario: any) {
  }

  static async updateUsuario(id: string, dados: any) {
  }

  static async deleteUsuario(id: string) {
  }
}
