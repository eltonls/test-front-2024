import { defineStore } from "pinia";
import Usuario from "../models/user.model";

interface UserInfo {
  id: number;
  senha: string;
  tipo: number;
  usuario: string;
}

export const UserStore = defineStore("user", {
  state: () => {
    return {
      user: null as UserInfo | null
    }
  },
  actions: {
    saveUser(user: UserInfo) {
      this.user = user;
    }
  }
})
