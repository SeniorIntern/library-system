import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  token: string;
  setToken: (newToken: string) => void;
};
/*

const useUserStore = create<UserStore>((set) => ({
  token: localStorage.getItem('token') || '', // Initialize with the token from localStorage
  setToken: (newToken: string) => {
    set({ token: newToken });
    localStorage.setItem('token', newToken); // Save the token to localStorage
  }
}));
*/

const useUserStore = create(persist<UserStore>((set) => ({
  token: '',
  setToken: (newToken: string) => set({ token: newToken }),
}),
  {
    name: 'token', // name of the item in the storage (must be unique)
  },
))


export default useUserStore;
