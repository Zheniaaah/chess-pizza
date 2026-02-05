'use client';

import type { Category } from '@prisma/client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

import { useCategoryStore } from '@/store';
import { cn } from '@/utils';

interface IProps {
  categories: Category[];
  className?: string;
}

export default function Categories({ categories, className }: IProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategoryId = useCategoryStore((state) => state.activeId);

  const queryString = searchParams.toString();

  return (
    <div className={cn('inline-flex gap-1 rounded-2xl bg-gray-50 p-1', className)}>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={
            queryString
              ? `${pathname}?${queryString}#${category.name}`
              : `${pathname}#${category.name}`
          }
          className={cn(
            'flex h-11 cursor-pointer items-center rounded-2xl px-5 font-bold',
            activeCategoryId === category.id && 'text-primary bg-white shadow-md shadow-gray-200',
          )}
        >
          <button className="cursor-pointer">{category.name}</button>
        </Link>
      ))}
    </div>
  );
}
