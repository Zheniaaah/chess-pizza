'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { useCategoryStore } from '@/store';
import { cn } from '@/utils';

interface IProps {
  className?: string;
}

const cats = [
  { id: 1, name: 'Піци' },
  { id: 2, name: 'Комбо' },
  { id: 3, name: 'Закуски' },
  { id: 4, name: 'Коктелі' },
  { id: 5, name: 'Кава' },
  { id: 6, name: 'Напої' },
  { id: 7, name: 'Десерти' },
];

export default function Categories({ className }: IProps) {
  const searchParams = useSearchParams();
  const activeCategoryId = useCategoryStore((state) => state.activeId);

  const queryString = searchParams.toString();

  return (
    <div className={cn('inline-flex gap-1 rounded-2xl bg-gray-50 p-1', className)}>
      {cats.map((cat) => (
        <Link
          key={cat.id}
          href={queryString ? `/?${queryString}#${cat.name}` : `/#${cat.name}`}
          className={cn(
            'flex h-11 cursor-pointer items-center rounded-2xl px-5 font-bold',
            activeCategoryId === cat.id && 'text-primary bg-white shadow-md shadow-gray-200',
          )}
        >
          <button className="cursor-pointer">{cat.name}</button>
        </Link>
      ))}
    </div>
  );
}
