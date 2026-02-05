import { notFound } from 'next/navigation';
import React from 'react';

import { ProductModal } from '@/components/shared';
import { prisma } from '@/lib';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function ProductModalPage({ params }: IProps) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      variations: true,
    },
  });

  if (!product) return notFound();

  return <ProductModal product={product} />;
}
