import { create } from "zustand";

const useAuthStore = create((set) => ({
    isLoggedIn: false,
    setLoginStatus: (status) => set({ isLoggedIn: status }),
}));

export default useAuthStore;
