import { CircleCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { cn } from '@/utils';

interface IProps {
  name: string;
  price: number;
  imageUrl: string;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}

export default function IngredientCard({
  name,
  price,
  imageUrl,
  onClick,
  isActive,
  className,
}: IProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative flex w-32 cursor-pointer flex-col items-center rounded-2xl border bg-white p-1 text-center shadow-md',
        isActive ? 'border-primary' : 'border-white',
        className,
      )}
    >
      {isActive && <CircleCheck className="text-primary absolute top-2 right-2" />}

      <Image src={imageUrl} alt={name} width={110} height={110} />

      <span className="text-xs">{name}</span>

      <span className="font-bold">{price} ₴</span>
    </div>
  );
}
