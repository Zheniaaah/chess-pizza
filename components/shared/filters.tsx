'use client';

import React, { useState } from 'react';

import { Checkbox, CheckboxesGroup } from '@/components/shared';
import { Input, RangeSlider } from '@/components/ui';
import { useFilterIngredients } from '@/hooks';

import Title from './title';

interface IProps {
  className?: string;
}

interface IPriceProps {
  priceFrom: number;
  priceTo: number;
}

export default function Filters({ className }: IProps) {
  const [{ priceFrom, priceTo }, setPrice] = useState<IPriceProps>({ priceFrom: 0, priceTo: 1000 });
  const { ingredients, loading, selectedValues, toggle } = useFilterIngredients();

  const updatePrice = (key: keyof IPriceProps, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className={className}>
      <Title size="sm" className="font-bold">
        Фільтрація
      </Title>

      <div className="mt-5 flex flex-col gap-4">
        <Checkbox value="1" label="Можна сбирати" name="qwe" />

        <Checkbox value="2" label="Новинки" name="ewq" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6">
        <p className="mb-3 font-bold">Ціна від і до:</p>

        <div className="mb-5 flex gap-3">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
            className="rounded-xl"
          />

          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
            className="rounded-xl"
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[priceFrom, priceTo]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
        />
      </div>

      <CheckboxesGroup
        title="Інгредієнти"
        items={ingredients}
        renderedItems={ingredients}
        limit={6}
        name="ingredients"
        loading={loading}
        selectedValues={selectedValues}
        onCheckboxClick={toggle}
        className="mt-5"
      />
    </div>
  );
}
