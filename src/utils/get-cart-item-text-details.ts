import type { Ingredient } from '@prisma/client';

import { DOUGH, SIZES } from '@/constants';
import type { TDough, TSize } from '@/types';

interface IReturn {
  textDetails: string;
  textIngredients: string | null;
}

export function getCartItemTextDetails(
  size: TSize,
  dough: TDough,
  ingredients?: Ingredient[],
): IReturn {
  const textSize = `${SIZES.find((s) => s.value === size)?.name} ${size} см`;
  const textDough = `${DOUGH.find((d) => d.value === dough)?.name} тісто`;
  const textIngredients = [];

  if (ingredients) {
    textIngredients.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return {
    textDetails: `${textSize}, ${textDough}`,
    textIngredients: textIngredients.length ? `+ ${textIngredients}` : null,
  };
}
