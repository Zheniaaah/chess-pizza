import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useSet } from 'react-use';

interface IPriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface IQueryFilters extends IPriceProps {
  dough: string;
  sizes: string;
  ingredients: string;
}

export interface IFilters {
  selectedDough: Set<string>;
  selectedSizes: Set<string>;
  prices: IPriceProps;
  selectedIngredients: Set<string>;
}

interface IReturn extends IFilters {
  toggleDough: (value: string) => void;
  toggleSizes: (value: string) => void;
  updatePrice: (key: keyof IPriceProps, value: number) => void;
  toggleIngredients: (value: string) => void;
}

export function useFilters(): IReturn {
  const searchParams = useSearchParams() as unknown as Map<keyof IQueryFilters, string>;

  const [selectedDough, { toggle: toggleDough }] = useSet(
    new Set<string>(
      searchParams.has('dough') ? searchParams.get('dough')?.split(',').filter(Boolean) : [],
    ),
  );

  const [selectedSizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has('sizes') ? searchParams.get('sizes')?.split(',').filter(Boolean) : [],
    ),
  );

  const [prices, setPrices] = useState<IPriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(
      searchParams.has('ingredients')
        ? searchParams.get('ingredients')?.split(',').filter(Boolean)
        : [],
    ),
  );

  const updatePrice = (key: keyof IPriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    selectedDough,
    toggleDough,
    selectedSizes,
    toggleSizes,
    prices,
    updatePrice,
    selectedIngredients,
    toggleIngredients,
  };
}
