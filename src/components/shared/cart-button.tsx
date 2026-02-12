'use client';

import { ArrowRight, ShoppingCart } from 'lucide-react';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/ui';
import { useCartStore } from '@/store/cart';
import { calcTotalQuantity, cn } from '@/utils';

import CartDrawer from './cart-drawer';

interface IProps {
  className?: string;
}

export default function CartButton({ className }: IProps) {
  const { totalAmount, items, loading } = useCartStore(
    useShallow((state) => ({
      totalAmount: state.totalAmount,
      items: state.items,
      loading: state.loading,
    })),
  );

  const totalQuantity = calcTotalQuantity(items);

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn('group relative rounded-2xl', loading && 'w-27', className)}
      >
        <b>{totalAmount} ₴</b>

        <span className="mx-3 h-full w-px bg-white/30" />

        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />

          <b>{totalQuantity}</b>
        </div>

        <ArrowRight
          size={20}
          className="absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </Button>
    </CartDrawer>
  );
}
