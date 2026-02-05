import { ArrowUpDown } from 'lucide-react';
import React from 'react';

import { cn } from '@/utils';

interface IProps {
  className?: string;
}

export default function SortPopup({ className }: IProps) {
  return (
    <div
      className={cn(
        'inline-flex h-13 cursor-pointer items-center gap-1 rounded-2xl bg-gray-50 px-5',
        className,
      )}
    >
      <ArrowUpDown size={16} />

      <b>Сортування:</b>

      <b className="text-primary">популярне</b>
    </div>
  );
}
