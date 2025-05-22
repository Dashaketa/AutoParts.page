// store/useAuthStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  usuario: null, // null si no está logueado
  setUsuario: (usuario) => set({ usuario }),
  logout: () => set({ usuario: null }),
}));

export default useAuthStore;
