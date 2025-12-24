import React from 'react';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: IProps) {
  const { id } = await params;

  return <p>Product {id}</p>;
}
