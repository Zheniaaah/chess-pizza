import { Minus, Plus } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/utils';

interface IProps {
  value: number;
  onClick: (type: 'plus' | 'minus') => void;
  className?: string;
}

export default function CountButtons({ value, onClick, className }: IProps) {
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <Button
        variant="outline"
        disabled={value === 1}
        onClick={() => onClick('minus')}
        className="hover:bg-primary h-[30px] w-[30px] rounded-[10px] p-0 hover:text-white disabled:border-gray-400 disabled:bg-white disabled:text-gray-400"
      >
        <Minus className="h-4" />
      </Button>

      <b className="text-sm">{value}</b>

      <Button
        variant="outline"
        onClick={() => onClick('plus')}
        className="hover:bg-primary h-[30px] w-[30px] rounded-[10px] p-0 hover:text-white disabled:border-gray-400 disabled:bg-white disabled:text-gray-400"
      >
        <Plus className="h-4" />
      </Button>
    </div>
  );
}
