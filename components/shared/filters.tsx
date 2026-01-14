'use client';

import React, { useState } from 'react';
import { useSet } from 'react-use';

import { CheckboxesGroup } from '@/components/shared';
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
  const [selectedSizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  const [selectedDough, { toggle: toggleDough }] = useSet(new Set<string>([]));
  const { ingredients, loading, selectedIngredients, toggleIngredients } = useFilterIngredients();

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

      <CheckboxesGroup
        title="Тісто"
        items={[
          { value: 'thin', label: 'Тонке' },
          { value: 'traditional', label: 'Традиційне' },
        ]}
        name="dough"
        selectedValues={selectedDough}
        onCheckboxClick={toggleDough}
        className="mt-5"
      />

      <CheckboxesGroup
        title="Розміри"
        items={[
          { value: '20', label: '20см' },
          { value: '30', label: '30см' },
          { value: '40', label: '40см' },
        ]}
        name="sizes"
        selectedValues={selectedSizes}
        onCheckboxClick={toggleSizes}
        className="mt-5"
      />

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
        limit={6}
        name="ingredients"
        loading={loading}
        selectedValues={selectedIngredients}
        onCheckboxClick={toggleIngredients}
        className="mt-5"
      />
    </div>
  );
}
