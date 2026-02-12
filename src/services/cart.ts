import { API_ROUTES } from '@/constants';
import type { ICartItemCreate, TCartWithRelations } from '@/types';

import { axiosInstance } from './axios';

export async function fetchCart(): Promise<TCartWithRelations> {
  return (await axiosInstance.get<TCartWithRelations>(API_ROUTES.CART)).data;
}

export async function updateCartItemQuantity(
  id: number,
  quantity: number,
): Promise<TCartWithRelations> {
  return (await axiosInstance.patch<TCartWithRelations>(API_ROUTES.CART_ITEM(id), { quantity }))
    .data;
}

export async function addCartItem(values: ICartItemCreate): Promise<TCartWithRelations> {
  return (await axiosInstance.post<TCartWithRelations>(API_ROUTES.CART, values)).data;
}

export async function removeCartItem(id: number): Promise<TCartWithRelations> {
  return (await axiosInstance.delete<TCartWithRelations>(API_ROUTES.CART_ITEM(id))).data;
}
