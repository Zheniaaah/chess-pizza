import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Title } from '@/components/shared';
import { Button } from '@/components/ui';

interface IProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export default function ProductCard({ id, name, price, imageUrl, className }: IProps) {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="bg-secondary flex h-[260px] items-center justify-center rounded-lg p-6">
          <Image width={215} height={215} src={imageUrl} alt={name} />
        </div>

        <Title size="sm" className="mt-3 mb-1 font-bold">
          {name}
        </Title>

        <p className="text-sm text-gray-400">
          Курча, моцарелла, сири чедер та пармезан, сирний соус, томати, соус альфредо, часник
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl">
            від <b>{price}</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Додати
          </Button>
        </div>
      </Link>
    </div>
  );
}
