'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';

import { useCategoryStore } from '@/store';
import { cn } from '@/utils';

import ProductCard from './product-card';
import Title from './title';

interface IProps {
  title: string;
  products: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export default function ProductCardsGroup({
  title,
  products,
  categoryId,
  listClassName,
  className,
}: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategoryId = useCategoryStore((state) => state.activeId);
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef<HTMLDivElement>(null!);

  const intersection = useIntersection(intersectionRef, {
    threshold: 1,
    rootMargin: '-120px 0px -85% 0px',
  });

  useEffect(() => {
    if (intersection?.isIntersecting && activeCategoryId !== categoryId) {
      setActiveCategoryId(categoryId);

      const queryString = searchParams.toString();
      const url = queryString ? `/?${queryString}#${title}` : `/#${title}`;

      router.replace(url, { scroll: false });
    }
  }, [
    intersection?.isIntersecting,
    activeCategoryId,
    setActiveCategoryId,
    categoryId,
    searchParams,
    title,
    router,
  ]);

  return (
    <div id={title} className={className}>
      <div ref={intersectionRef} className="pointer-events-none absolute h-5 opacity-0" />

      <Title size="lg" className="mb-5 font-extrabold">
        {title}
      </Title>

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            name={product.name}
            price={product.variations[0].price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
