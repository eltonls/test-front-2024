import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => {
    return {
      user: null
    }
  },
  actions: {
    storeUser(user: any) {
      this.user = user;
    }
  }
})
