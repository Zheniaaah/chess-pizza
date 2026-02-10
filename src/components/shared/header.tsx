import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/utils';

import CartButton from './cart-button';
import Container from './container';
import SearchInput from './search-input';

interface IProps {
  className?: string;
}

export default function Header({ className }: IProps) {
  return (
    <header className={cn('border border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />

            <div>
              <h1 className="text-2xl font-black uppercase">Chess Pizza</h1>

              <p className="text-sm leading-3 text-gray-400">смачніше вже нікуди</p>
            </div>
          </div>
        </Link>

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1 rounded-2xl">
            <User size={16} />
            Увійти
          </Button>

          <CartButton />
        </div>
      </Container>
    </header>
  );
}
