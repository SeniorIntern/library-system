import { create } from 'zustand';

type UserStore = {
  token: string;
  setToken: (newToken: string) => void;
};

const useUserStore = create<UserStore>((set) => ({
  token: localStorage.getItem('token') || '', // Initialize with the token from localStorage
  setToken: (newToken: string) => {
    set({ token: newToken });
    localStorage.setItem('token', newToken); // Save the token to localStorage
  },
}));

export default useUserStore;

