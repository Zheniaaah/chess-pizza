import { create } from 'zustand';

import { api } from '@/services';
import type { ICartItem, ICartItemCreate, TCartWithRelations } from '@/types';
import { mapCartToDTO } from '@/utils';

interface IState {
  totalAmount: number;
  items: ICartItem[];
  loading: boolean;
  error: boolean;
  fetchCart: () => Promise<void>;
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: ICartItemCreate) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<IState>()((set) => {
  const withLoading = async (apiCall: () => Promise<TCartWithRelations>) => {
    try {
      set({ loading: true, error: false });
      const data = await apiCall();
      set(mapCartToDTO(data));
    } catch (e) {
      set({ error: true });
      console.error(e);
      throw e;
    } finally {
      set({ loading: false });
    }
  };

  return {
    totalAmount: 0,
    items: [],
    loading: false,
    error: false,
    fetchCart: () => withLoading(() => api.cart.fetchCart()),
    updateCartItemQuantity: (id, quantity) =>
      withLoading(() => api.cart.updateCartItemQuantity(id, quantity)),
    addCartItem: (values) => withLoading(() => api.cart.addCartItem(values)),
    removeCartItem: (id) => withLoading(() => api.cart.removeCartItem(id)),
  };
});
