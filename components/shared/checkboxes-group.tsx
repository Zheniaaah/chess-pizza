'use client';

import React, { type ChangeEvent, useState } from 'react';

import { Checkbox, type ICheckboxProps } from '@/components/shared';
import { Input, Skeleton } from '@/components/ui';

interface IProps {
  title: string;
  items: ICheckboxProps[];
  renderedItems: ICheckboxProps[];
  limit?: number;
  name?: string;
  loading?: boolean;
  searchInputPlaceholder?: string;
  selectedValues?: Set<string>;
  onCheckboxClick?: (value: string) => void;
  className?: string;
}

export default function CheckboxesGroup({
  title,
  items,
  renderedItems,
  limit = 5,
  name,
  loading,
  searchInputPlaceholder = 'Пошук...',
  selectedValues,
  onCheckboxClick,
  className,
}: IProps) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const list = showAll
    ? items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase()))
    : renderedItems.slice(0, limit);

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={className}>
      <p className="font-bold">{title}</p>

      {loading && (
        <>
          <div className="mt-5 flex flex-col gap-4">
            {Array.from({ length: limit }).map((_, i) => (
              <Skeleton key={i} className="h-6 rounded-lg" />
            ))}
          </div>

          <Skeleton className="mt-3 h-6 w-28.5 rounded-lg" />
        </>
      )}

      {!loading && (
        <>
          {showAll && (
            <Input
              placeholder={searchInputPlaceholder}
              value={searchValue}
              onChange={onChangeSearchInput}
              className="mt-3 rounded-xl border-none bg-gray-50"
            />
          )}

          <div className="scrollbar mt-5 flex max-h-96 flex-col gap-4 overflow-auto pr-2">
            {list.map((item, index) => (
              <Checkbox
                key={index}
                value={item.value}
                label={item.label}
                name={name}
                checked={selectedValues?.has(item.value)}
                onCheckedChange={() => onCheckboxClick?.(item.value)}
                showAll={showAll}
                endAdornment={item.endAdornment}
              />
            ))}
          </div>

          {items.length > limit && (
            <div className={showAll ? 'mt-4 border-t border-t-neutral-100' : ''}>
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="text-primary mt-3 cursor-pointer"
              >
                {showAll ? '- Сховати' : '+ Показати все'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
