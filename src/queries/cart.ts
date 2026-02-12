import { Prisma } from '@prisma/client';

export const cartQueryArgs = {
  include: {
    items: {
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        productVariation: {
          include: {
            product: true,
          },
        },
        ingredients: true,
      },
    },
  },
} satisfies Prisma.CartFindFirstArgs;
