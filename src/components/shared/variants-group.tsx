'use client';

import React from 'react';

import { cn } from '@/utils';

export interface IVariant {
  value: string | number;
  name: string;
  disabled?: boolean;
}

interface IProps {
  variants: readonly IVariant[];
  onClick?: (value: IVariant['value']) => void;
  selectedValue?: IVariant['value'];
  className?: string;
}

export default function VariantsGroup({ variants, onClick, selectedValue, className }: IProps) {
  return (
    <div className={cn('flex justify-between rounded-3xl bg-[#ECECEC] p-1 select-none', className)}>
      {variants.map((variant) => (
        <button
          key={variant.value}
          onClick={() => onClick?.(variant.value)}
          className={cn(
            'flex h-[30px] flex-1 cursor-pointer items-center justify-center rounded-3xl px-5 py-1 text-sm transition-all duration-400',
            variant.value === selectedValue && 'bg-white shadow',
            variant.disabled && 'pointer-events-none text-gray-500 opacity-50',
          )}
        >
          {variant.name}
        </button>
      ))}
    </div>
  );
}
