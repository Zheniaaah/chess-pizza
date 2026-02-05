import type { Ingredient } from '@prisma/client';

import { ROUTES } from '@/constants';
import { axiosInstance } from '@/services';

export async function getAll(): Promise<Ingredient[]> {
  return (await axiosInstance.get<Ingredient[]>(ROUTES.INGREDIENTS)).data;
}
