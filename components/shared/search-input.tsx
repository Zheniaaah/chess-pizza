'use client';

import type { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useClickAway, useDebounce, useKey } from 'react-use';

import { Input } from '@/components/ui';
import { api } from '@/services';
import { cn } from '@/utils';

interface IProps {
  className?: string;
}

export default function SearchInput({ className }: IProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useDebounce(
    () => {
      api.products.search(searchQuery).then((products: Product[]) => setProducts(products));
    },
    250,
    [searchQuery],
  );

  const handleFocus = () => {
    setIsVisible(true);
    setTimeout(() => setIsFocused(true), 10);
  };

  const handleBlur = () => {
    setIsFocused(false);
    inputRef.current?.blur();
    setTimeout(() => setIsVisible(false), 200);
  };

  useClickAway(containerRef, () => {
    handleBlur();
  });

  useKey('Escape', handleBlur);

  const onItemClick = () => {
    handleBlur();
    setSearchQuery('');
    setTimeout(() => setProducts([]), 200);
  };

  return (
    <>
      {isVisible && (
        <div
          className={cn(
            'fixed inset-0 z-30 bg-black/50 opacity-0 transition-opacity duration-200',
            isFocused && 'opacity-100',
          )}
        />
      )}

      <div
        ref={containerRef}
        className={cn('relative z-30 flex h-11 justify-between rounded-2xl', className)}
      >
        <Search className="absolute top-1/2 left-3 h-5 -translate-y-1/2 text-gray-400" />

        <Input
          type="text"
          placeholder="Знайти піцу"
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleFocus}
          className="h-full rounded-2xl border-none bg-gray-100 pl-11"
        />

        {!!products.length && (
          <div
            className={cn(
              'ring-ring/50 invisible absolute top-50 z-30 w-full overflow-hidden rounded-xl bg-white opacity-0 shadow-md ring-[3px] transition-all duration-200',
              isFocused && 'visible top-14 opacity-100',
            )}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                onClick={onItemClick}
                className="hover:bg-primary/10 flex w-full cursor-pointer items-center gap-3 px-3 py-2 transition-colors duration-25"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={32}
                  height={32}
                  className="size-8 rounded-sm"
                />

                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
