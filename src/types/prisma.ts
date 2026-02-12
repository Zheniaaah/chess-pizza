import { Prisma } from '@prisma/client';

import { cartQueryArgs, productQueryArgs } from '@/queries';

export type TProductWithRelations = Prisma.ProductGetPayload<typeof productQueryArgs>;

export type TCartWithRelations = Prisma.CartGetPayload<typeof cartQueryArgs>;
export type TCartItemWithRelations = TCartWithRelations['items'][number];
