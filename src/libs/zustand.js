import { create } from "zustand";

const useStore = create((set) => ({
  isLoggedIn: false,
  paymentMidtrans: {},
  newParams: {},
  setNewParams: (id) => set((state) => ({ newParams: id })),
  setPaymentMidtrans: (data) => set((state) => ({ paymentMidtrans: data })),
  setIsLoggedIn: (data) => set((state) => ({ isLoggedIn: data })),
}));


export default useStore