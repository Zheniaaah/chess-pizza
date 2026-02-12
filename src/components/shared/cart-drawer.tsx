'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import CartDrawerItem from '@/components/shared/cart-drawer-item';
import {
  Button,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import { useCartStore } from '@/store/cart';
import { calcTotalQuantity, getCartItemTextDetails } from '@/utils';

export default function CartDrawer({ children }: React.PropsWithChildren) {
  const { totalAmount, items, fetchCart, updateCartItemQuantity, removeCartItem } = useCartStore(
    useShallow((state) => ({
      totalAmount: state.totalAmount,
      items: state.items,
      fetchCart: state.fetchCart,
      updateCartItemQuantity: state.updateCartItemQuantity,
      removeCartItem: state.removeCartItem,
    })),
  );

  const totalQuantity = calcTotalQuantity(items);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleUpdateQuantity = (id: number, quantity: number, type: 'plus' | 'minus') => {
    updateCartItemQuantity(id, type === 'plus' ? ++quantity : --quantity);
  };

  const handleRemoveItem = (id: number) => {
    removeCartItem(id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            У кошику
            <span className="font-bold"> {totalQuantity} товари</span>
          </SheetTitle>
        </SheetHeader>

        <div className="scrollbar mx-2 mb-4 flex flex-1 flex-col gap-2 overflow-auto rounded-2xl">
          {items.map((item) => (
            <CartDrawerItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              imageUrl={item.imageUrl}
              details={getCartItemTextDetails(item.size, item.dough, item.ingredients)}
              handleUpdateQuantity={(type) => handleUpdateQuantity(item.id, item.quantity, type)}
              handleRemoveItem={() => handleRemoveItem(item.id)}
            />
          ))}
        </div>

        <SheetFooter className="mx-2 mb-4 rounded-2xl bg-white p-8">
          <div className="mb-4 flex">
            <span className="flex flex-1 text-lg text-neutral-500">
              Разом
              <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
            </span>

            <span className="text-lg font-bold">{totalAmount} ₴</span>
          </div>

          <Link href="/cart">
            <Button type="submit" className="h-12 w-full text-base">
              Оформити замовлення
              <ArrowRight className="ml-2 w-5" />
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
