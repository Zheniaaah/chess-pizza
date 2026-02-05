import type { Ingredient, ProductVariation } from '@prisma/client';

import type { TDough, TSize } from '@/types';

export function calcPizzaPrice(
  variations: ProductVariation[] | undefined,
  ingredients: Ingredient[] | undefined,
  selectedSize: TSize,
  selectedDough: TDough,
  selectedIngredients: Set<number>,
): number {
  if (!variations || !ingredients) return 0;

  const pizzaPrise =
    variations.find(
      (variation) => variation.size === selectedSize && variation.dough === selectedDough,
    )?.price ?? 0;

  const ingredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrise + ingredientsPrice;
}
