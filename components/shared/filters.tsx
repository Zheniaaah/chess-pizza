'use client';

import React from 'react';

import { CheckboxesGroup } from '@/components/shared';
import { Input, RangeSlider } from '@/components/ui';
import { useFilters, useIngredients, useQueryFilters } from '@/hooks';

import Title from './title';

interface IProps {
  className?: string;
}

export default function Filters({ className }: IProps) {
  const { ingredients, loading } = useIngredients();
  const {
    selectedDough,
    toggleDough,
    selectedSizes,
    toggleSizes,
    prices,
    updatePrice,
    selectedIngredients,
    toggleIngredients,
  } = useFilters();

  useQueryFilters({ selectedDough, selectedSizes, prices, selectedIngredients });

  const setPrices = (prices: number[]) => {
    updatePrice('priceFrom', prices[0]);
    updatePrice('priceTo', prices[1]);
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
            value={prices.priceFrom ?? 0}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
            className="rounded-xl"
          />

          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={prices.priceTo ?? 1000}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
            className="rounded-xl"
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom ?? 0, prices.priceTo ?? 1000]}
          onValueChange={setPrices}
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
