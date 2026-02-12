'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Dialog, DialogContent } from '@/components/ui';
import type { TProductWithRelations } from '@/types';
import { cn } from '@/utils';

import ProductForm from '../product-form';

interface IProps {
  product: TProductWithRelations;
  className?: string;
}

export default function ProductModal({ product, className }: IProps) {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'h-[650px] max-w-[1060px] min-w-[1060px] overflow-hidden bg-white p-0',
          className,
        )}
      >
        <ProductForm product={product} />
      </DialogContent>
    </Dialog>
  );
}
