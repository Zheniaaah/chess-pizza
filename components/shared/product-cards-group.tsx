'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';

import { ProductCard, Title } from '@/components/shared';
import { useCategoryStore } from '@/store';
import { cn } from '@/utils';

interface IProps {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export default function ProductCardsGroup({
  title,
  items,
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
    threshold: 0.2,
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
    <div id={title} ref={intersectionRef} className={className}>
      <Title size="lg" className="mb-5 font-extrabold">
        {title}
      </Title>

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((item, index) => (
          <ProductCard
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
