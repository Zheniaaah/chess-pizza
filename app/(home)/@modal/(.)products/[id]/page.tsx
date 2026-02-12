import { notFound } from 'next/navigation';
import React from 'react';

import { ProductModal } from '@/components/shared';
import { prisma } from '@/lib';
import { productQueryArgs } from '@/queries';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function ProductModalPage({ params }: IProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    ...productQueryArgs,
  });

  if (!product) return notFound();

  return <ProductModal product={product} />;
}
