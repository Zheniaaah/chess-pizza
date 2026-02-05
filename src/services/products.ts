import type { Product } from '@prisma/client';

import { ROUTES } from '@/constants';
import { axiosInstance } from '@/services';

export async function search(query: string): Promise<Product[]> {
  return (await axiosInstance.get<Product[]>(ROUTES.SEARCH_PRODUCTS, { params: { query } })).data;
}
