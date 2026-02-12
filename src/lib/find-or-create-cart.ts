import { prisma } from '@/lib/prisma';

export async function findOrCreateCart(token: string) {
  let cart = await prisma.cart.findUnique({
    where: { token },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { token },
    });
  }

  return cart;
}
