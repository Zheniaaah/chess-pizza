import React from 'react';

import { cn } from '@/lib';

interface IProps {
  className?: string;
}

const cats = ['Піци', 'Комбо', 'Закуски', 'Коктелі', 'Кава', 'Напої', 'Десерти', 'Десерти'];
const activeIndex = 0;

export default function Categories({ className }: IProps) {
  return (
    <div className={cn('inline-flex gap-1 rounded-2xl bg-gray-50 p-1', className)}>
      {cats.map((cat, index) => (
        <a
          key={index}
          className={cn(
            'flex h-11 cursor-pointer items-center rounded-2xl px-5 font-bold',
            activeIndex === index && 'text-primary bg-white shadow-md shadow-gray-200',
          )}
        >
          <button className="cursor-pointer">{cat}</button>
        </a>
      ))}
    </div>
  );
}
