import Image from 'next/image';
import React from 'react';

import { cn } from '@/utils';

interface IProps {
  src: string;
  alt: string;
  size?: 20 | 30 | 40;
  className?: string;
}

export default function ProductImage({ src, size, alt, className }: IProps) {
  return (
    <div className={cn('relative flex w-fit flex-1 items-center justify-center', className)}>
      <Image
        src={src}
        alt={alt}
        width={350}
        height={350}
        className={cn(
          'relative top-2 left-2 z-10 transition-all duration-300',
          size === 20 && 'h-[300px] w-[300px]',
          size === 30 && 'h-[400px] w-[400px]',
          size === 40 && 'h-[500px] w-[500px]',
        )}
      />

      {size && (
        <>
          <div className="absolute top-1/2 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-gray-200" />

          <div className="absolute top-1/2 left-1/2 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dotted border-gray-100" />
        </>
      )}
    </div>
  );
}
