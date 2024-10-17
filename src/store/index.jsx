import { create } from "zustand";
import { removeFromLocalStorage } from "../utils";

const store = create((set) => ({
  user: null,
  token: null,
  loading: null,
  setUser: (user, token) => {
    set({user, token})
  },
  setLoading: (value) => {
    set({ loading: value });
  },
  logOut: () => {
    removeFromLocalStorage("token");
    set({ user: null, token: null});
  },
}));

export default store;
