import React from 'react';

import { Categories, Container, SortPopup } from '@/components/shared';
import { cn } from '@/lib';

interface IProps {
  className?: string;
}

export default function TopBar({ className }: IProps) {
  return (
    <div className={cn('sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5', className)}>
      <Container className="flex items-center justify-between">
        <Categories />

        <SortPopup />
      </Container>
    </div>
  );
}
