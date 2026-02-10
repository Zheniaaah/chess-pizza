import { ArrowRight, ShoppingCart } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/utils';

import CartDrawer from './cart-drawer';

interface IProps {
  className?: string;
}

export default function CartButton({ className }: IProps) {
  return (
    <CartDrawer>
      <Button className={cn('group relative rounded-2xl', className)}>
        <b>520 ₴</b>

        <span className="mx-3 h-full w-px bg-white/30" />

        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />

          <b>3</b>
        </div>

        <ArrowRight
          size={20}
          className="absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </Button>
    </CartDrawer>
  );
}
