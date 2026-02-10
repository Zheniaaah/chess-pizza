'use client';

import { Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { cn, getCartItemTextDetails } from '@/utils';

import CountButtons from './count-buttons';

interface IProps {
  id: number;
  name: string;
  quantity: number;
  imageUrl: string;
  price: number;
  className?: string;
}

export default function CartDrawerItem({ id, name, quantity, imageUrl, price, className }: IProps) {
  const { textDetails, textIngredients } = getCartItemTextDetails(20, 'thin', []);

  return (
    <div className={cn('relative flex gap-6 rounded-2xl bg-white p-5 shadow-xs', className)}>
      <Image src={imageUrl} alt={name} width={60} height={60} className="self-start" />

      <div className="flex-1">
        <h2 className="flex-1 text-lg leading-6 font-bold">{name}</h2>

        <p className="text-xs text-gray-400">{textDetails}</p>

        {textIngredients && <p className="text-xs text-gray-400">{textIngredients}</p>}

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButtons value={quantity} onClick={(type) => console.log(type)} />

          <span className="font-bold">{price} ₴</span>
        </div>
      </div>

      <Trash2Icon
        onClick={() => console.log('deleted')}
        className="hover:text-primary absolute top-5 right-5 size-5 cursor-pointer"
      />
    </div>
  );
}
