import type { Product } from '@prisma/client';

import { API_ROUTES } from '@/constants';

import { axiosInstance } from './axios';

export async function search(query: string): Promise<Product[]> {
  return (await axiosInstance.get<Product[]>(API_ROUTES.SEARCH_PRODUCTS, { params: { query } }))
    .data;
}
