'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Dialog, DialogContent } from '@/components/ui';
import type { IProductWithRelations } from '@/types';
import { cn } from '@/utils';

import ProductForm from '../product-form';

interface IProps {
  product: IProductWithRelations;
  className?: string;
}

export default function ProductModal({ product, className }: IProps) {
  const router = useRouter();

  const isPizza = Boolean(product.variations[0].dough);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'h-[650px] max-w-[1060px] min-w-[1060px] overflow-hidden bg-white p-0',
          className,
        )}
      >
        <ProductForm
          ingredients={isPizza ? product.ingredients : undefined}
          variations={isPizza ? product.variations : undefined}
          name={product.name}
          imageUrl={product.imageUrl}
        />
      </DialogContent>
    </Dialog>
  );
}
