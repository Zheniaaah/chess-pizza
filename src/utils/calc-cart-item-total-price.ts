import type { TCartItemWithRelations } from '@/types';

export function calcCartItemTotalPrice(item: TCartItemWithRelations): number {
  const ingredientsTotalPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0,
  );

  return (item.productVariation.price + ingredientsTotalPrice) * item.quantity;
}
