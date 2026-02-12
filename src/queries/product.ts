import { Prisma } from '@prisma/client';

export const productQueryArgs = {
  include: {
    ingredients: true,
    variations: true,
  },
} satisfies Prisma.ProductFindFirstArgs;
