import type { Ingredient } from '@prisma/client';

import { API_ROUTES } from '@/constants';

import { axiosInstance } from './axios';

export async function fetchAll(): Promise<Ingredient[]> {
  return (await axiosInstance.get<Ingredient[]>(API_ROUTES.INGREDIENTS)).data;
}
