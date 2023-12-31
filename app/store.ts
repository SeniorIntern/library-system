import { create } from 'zustand'

type UserStore = {
  token: null | string,
  setToken: (newToken: string) => void
}

const useUserStore = create<UserStore>(set => ({
  token: null,
  setToken: (newToken: string) => set({ token: newToken }),
}))

export default useUserStore
