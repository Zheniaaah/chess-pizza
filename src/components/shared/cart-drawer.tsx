import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

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

export default function CartDrawer({ children }: React.PropsWithChildren) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            У кошику <span className="font-bold">3 товари</span>
          </SheetTitle>
        </SheetHeader>

        <div className="scrollbar mx-2 mb-4 flex flex-1 flex-col gap-2 overflow-auto rounded-2xl">
          <CartDrawerItem
            id={1}
            name="Сирна"
            quantity={1}
            imageUrl="https://images.weserv.nl/?url=media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp"
            price={350}
          />
          <CartDrawerItem
            id={1}
            name="Сирна"
            quantity={1}
            imageUrl="https://images.weserv.nl/?url=media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp"
            price={350}
          />
          <CartDrawerItem
            id={1}
            name="Сирна"
            quantity={1}
            imageUrl="https://images.weserv.nl/?url=media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp"
            price={350}
          />
          <CartDrawerItem
            id={1}
            name="Сирна"
            quantity={1}
            imageUrl="https://images.weserv.nl/?url=media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp"
            price={350}
          />
          <CartDrawerItem
            id={1}
            name="Сирна"
            quantity={1}
            imageUrl="https://images.weserv.nl/?url=media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp"
            price={350}
          />
          <CartDrawerItem
            id={1}
            name="Сирна"
            quantity={1}
            imageUrl="https://images.weserv.nl/?url=media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp"
            price={350}
          />
          <CartDrawerItem
            id={1}
            name="Сирна"
            quantity={1}
            imageUrl="https://images.weserv.nl/?url=media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp"
            price={350}
          />
        </div>

        <SheetFooter className="mx-2 mb-4 rounded-2xl bg-white p-8">
          <div className="mb-4 flex">
            <span className="flex flex-1 text-lg text-neutral-500">
              Разом
              <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
            </span>

            <span className="text-lg font-bold">999 ₴</span>
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
