'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useClickAway, useKey } from 'react-use';

import { Input } from '@/components/ui';
import { cn } from '@/utils';

interface IProps {
  className?: string;
}

export default function SearchInput({ className }: IProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useClickAway(inputRef, () => {
    setIsFocused(false);
  });

  useKey('Escape', () => setIsFocused(false));

  return (
    <>
      {isFocused && <div className="fixed inset-0 z-30 bg-black/50" />}

      <div
        ref={inputRef}
        className={cn('relative z-30 flex h-11 justify-between rounded-2xl', className)}
      >
        <Search className="absolute top-1/2 left-3 h-5 -translate-y-1/2 text-gray-400" />

        <Input
          type="text"
          placeholder="Знайти піцу"
          onFocus={() => setIsFocused(true)}
          className="h-full rounded-2xl border-none bg-gray-100 pl-11"
        />

        <div
          className={cn(
            'invisible absolute top-14 z-30 w-full overflow-hidden rounded-xl bg-white opacity-0 shadow-md transition-all duration-200',
            isFocused && 'visible top-12 opacity-100',
          )}
        >
          <Link
            href="/product/1"
            className="hover:bg-primary/10 flex w-full cursor-pointer items-center gap-3 px-3 py-2"
          >
            <Image
              src="https://images.weserv.nl/?url=media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp"
              alt="Піца 1"
              width={32}
              height={32}
              className="size-8 rounded-sm"
            />

            <span>Піца 1</span>
          </Link>
        </div>
      </div>
    </>
  );
}
