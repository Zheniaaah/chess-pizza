import { cartQueryArgs } from '@/queries';
import { calcCartItemTotalPrice } from '@/utils';

import { prisma } from './prisma';

export async function updateCartTotalAmount(token: string) {
  const cart = await prisma.cart.findUnique({
    where: { token },
    ...cartQueryArgs,
  });

  if (!cart) return;

  const totalAmount = cart.items.reduce((acc, item) => acc + calcCartItemTotalPrice(item), 0);

  return prisma.cart.update({
    where: { token },
    data: { totalAmount },
    ...cartQueryArgs,
  });
}
