'use client';

import React, { type ChangeEvent, useState } from 'react';

import { Checkbox, type ICheckboxProps } from '@/components/shared';
import { Input } from '@/components/ui';

interface IProps {
  title: string;
  items: ICheckboxProps[];
  renderedItems: ICheckboxProps[];
  limit?: number;
  searchInputPlaceholder?: string;
  defaultValues?: ICheckboxProps[];
  onChange?: (values: ICheckboxProps[]) => void;
  className?: string;
}

export default function CheckboxesGroup({
  title,
  items,
  renderedItems,
  limit = 5,
  searchInputPlaceholder = 'Пошук...',
  defaultValues,
  onChange,
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
      <p className="mb-3 font-bold">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            value={searchValue}
            onChange={onChangeSearchInput}
            className="border-none bg-gray-50"
          />
        </div>
      )}

      <div className="scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2">
        {list.map((item, index) => (
          <Checkbox
            key={index}
            label={item.label}
            value={item.value}
            checked={false}
            onCheckedChange={() => console.log('ids')}
            endAdornment={item.endAdornment}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'mt-4 border-t border-t-neutral-100' : ''}>
          <button onClick={() => setShowAll((prev) => !prev)} className="text-primary mt-3">
            {showAll ? 'Сховати' : '+ Показати все'}
          </button>
        </div>
      )}
    </div>
  );
}
