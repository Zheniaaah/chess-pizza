import { type NextRequest, NextResponse } from 'next/server';

import { findOrCreateCart, prisma, updateCartTotalAmount } from '@/lib';
import { cartQueryArgs } from '@/queries';
import type { ICartItemCreate } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('cartToken')?.value;

    if (!token) return NextResponse.json({ totalAmount: 0, items: [] });

    const cart = await prisma.cart.findUnique({
      where: { token },
      ...cartQueryArgs,
    });

    return NextResponse.json(cart);
  } catch (e) {
    console.error('[CART_GET] Server error: ', e);
    return NextResponse.json({ message: 'Не вдалося отримати кошик' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    let token = request.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const cart = await findOrCreateCart(token);

    const data = (await request.json()) as ICartItemCreate;

    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: cart.id,
        productVariationId: data.productVariationId,
      },
      include: {
        ingredients: true,
      },
    });

    const ingredientsIds = data.ingredientsIds?.sort() || [];

    const cartItem = cartItems.find((item) => {
      const cartItemIngredientsIds = item.ingredients.map((ingredient) => ingredient.id).sort();

      return (
        ingredientsIds.length === cartItemIngredientsIds.length &&
        cartItemIngredientsIds.every((id, i) => id === ingredientsIds[i])
      );
    });

    console.log(cartItem);

    if (cartItem) {
      await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: cartItem.quantity + 1,
        },
      });

      const updatedCart = await updateCartTotalAmount(token);

      return NextResponse.json(updatedCart);
    }

    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productVariationId: data.productVariationId,
        ingredients: {
          connect: ingredientsIds.map((id) => ({ id })),
        },
      },
    });

    const updatedCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updatedCart);
    response.cookies.set('cartToken', token);

    return response;
  } catch (e) {
    console.error('[CART_POST] Server error: ', e);
    return NextResponse.json({ message: 'Не вдалося створити кошик' }, { status: 500 });
  }
}
