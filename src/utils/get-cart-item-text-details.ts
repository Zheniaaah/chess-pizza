import { DOUGH, SIZES } from '@/constants';
import type { ICartItem, TDough, TSize } from '@/types';

interface IReturn {
  textDetails: string;
  textIngredients: string | null;
}

export function getCartItemTextDetails(
  size: TSize | null,
  dough: TDough | null,
  ingredients?: ICartItem['ingredients'],
): IReturn {
  if (!size || !dough) return { textDetails: '', textIngredients: null };

  const textSize = `${SIZES.find((s) => s.value === size)?.name} ${size} см`;
  const textDough = `${DOUGH.find((d) => d.value === dough)?.name} тісто`;
  const textIngredients = [];

  if (ingredients) {
    textIngredients.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return {
    textDetails: `${textSize}, ${textDough}`,
    textIngredients: textIngredients.length ? `+ ${textIngredients.join(', ')}` : null,
  };
}
