import { notFound } from 'next/navigation';
import React from 'react';

import { Container, ProductImage, Title } from '@/components/shared';
import VariantsGroup from '@/components/shared/variants-group';
import { prisma } from '@/lib';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: IProps) {
  const { id } = await params;

  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) return notFound();

  return (
    <Container className="my-10 flex">
      <ProductImage src={product.imageUrl} alt={product.name} size={30} />

      <div className="w-[490px] bg-[#F4F1EE] p-7">
        <Title size="md" className="font-extrabold">
          {product.name}
        </Title>

        <p className="mt-1 text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </p>

        <VariantsGroup
          variants={[
            { value: '1', name: 'Маленька' },
            { value: '2', name: 'Середня' },
            { value: '3', name: 'Велика' },
          ]}
        />
      </div>
    </Container>
  );
}
