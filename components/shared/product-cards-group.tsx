'use client';

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
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef<HTMLDivElement>(null!);

  const intersection = useIntersection(intersectionRef, {
    threshold: 0.2,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, setActiveCategoryId, categoryId]);

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
