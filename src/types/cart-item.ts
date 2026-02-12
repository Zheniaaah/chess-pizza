import type { TDough, TSize } from './pizza';

export interface ICartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
  size: TSize | null;
  dough: TDough | null;
  ingredients: { name: string; price: number }[];
}

export interface ICartItemCreate {
  productVariationId: number;
  ingredientsIds: number[] | undefined;
}
