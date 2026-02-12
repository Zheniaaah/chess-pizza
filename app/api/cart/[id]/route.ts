import { type NextRequest, NextResponse } from 'next/server';

import { prisma, updateCartTotalAmount } from '@/lib';

interface IProps {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: IProps) {
  try {
    const token = request.cookies.get('cartToken')?.value;

    if (!token) return NextResponse.json({ error: 'Cart token not found' });

    const { id } = await params;
    const data = (await request.json()) as { quantity: number };

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!cartItem) return NextResponse.json({ error: 'Cart item not found' });

    await prisma.cartItem.update({
      where: {
        id: Number(id),
      },
      data,
    });

    const updatedCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedCart);
  } catch (e) {
    console.error('[CART_ITEM_PATCH] Server error: ', e);
    return NextResponse.json({ message: 'Не вдалося оновити кошик' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: IProps) {
  try {
    const token = request.cookies.get('cartToken')?.value;

    if (!token) return NextResponse.json({ error: 'Cart token not found' });

    const { id } = await params;

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!cartItem) return NextResponse.json({ error: 'Cart item not found' });

    await prisma.cartItem.delete({
      where: {
        id: Number(id),
      },
    });

    const updatedCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedCart);
  } catch (e) {
    console.error('[CART_ITEM_DELETE] Server error: ', e);
    return NextResponse.json({ message: 'Не вдалося видалити товар' }, { status: 500 });
  }
}
