import { create } from 'zustand';
import zustymiddleware from 'zustymiddleware';

const useStore = create(
  zustymiddleware((set) => ({
    formData: {},
    setFormData: (data) => set(() => ({ formData: data })),
  })),
);

if (process.env.NODE_ENV === 'development') {
  window.store = useStore;
}
export default useStore;
