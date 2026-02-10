import type { Ingredient, ProductVariation } from '@prisma/client';
import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from 'react';
import { useSet } from 'react-use';

import type { IVariant } from '@/components/shared';
import { DOUGH, SIZES } from '@/constants';
import type { TDough, TSize } from '@/types';
import { calcPizzaPrice } from '@/utils';

interface IReturn {
  selectedSize: TSize;
  setSelectedSize: Dispatch<SetStateAction<TSize>>;
  selectedDough: TDough;
  setSelectedDough: Dispatch<SetStateAction<TDough>>;
  selectedIngredients: Set<number>;
  toggleIngredient: (value: number) => void;
  textDetails: string;
  availableSizes: IVariant[];
  totalPizzaPrice: number;
}

export function usePizzaOptions(
  variations: ProductVariation[] | undefined,
  ingredients: Ingredient[] | undefined,
): IReturn {
  const [selectedSize, setSelectedSize] = useState<TSize>(20);
  const [selectedDough, setSelectedDough] = useState<TDough>('traditional');
  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

  const textDetails = (() => {
    const textSize = `${selectedSize} см`;
    const textDough = `${DOUGH.find((d) => d.value === selectedDough)?.name} тісто`;
    const textIngredients = selectedIngredients.size
      ? `, доп. інгредіенти (${selectedIngredients.size})`
      : '';

    return `${textSize}, ${textDough}${textIngredients}`;
  })();

  const availableSizes = useMemo(() => {
    if (!variations) return [];

    const availableVariations = variations.filter((variation) => variation.dough === selectedDough);

    return SIZES.map((size) => ({
      ...size,
      disabled: !availableVariations.some((variation) => variation.size === size.value),
    }));
  }, [variations, selectedDough]);

  useEffect(() => {
    const isSizeAvailable = availableSizes.find(
      (size) => size.value === selectedSize && !size.disabled,
    );

    if (isSizeAvailable) return;

    const firstAvailableSize = availableSizes.find((size) => !size.disabled);

    if (firstAvailableSize) {
      setSelectedSize(firstAvailableSize.value);
    }
  }, [availableSizes, selectedSize, setSelectedSize]);

  const totalPizzaPrice = calcPizzaPrice(
    variations,
    ingredients,
    selectedSize,
    selectedDough,
    selectedIngredients,
  );

  return {
    selectedSize,
    setSelectedSize,
    selectedDough,
    setSelectedDough,
    selectedIngredients,
    toggleIngredient,
    textDetails,
    availableSizes,
    totalPizzaPrice,
  };
}
