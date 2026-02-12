import type { ICartItem, TCartWithRelations, TDough, TSize } from '@/types';
import { calcCartItemTotalPrice } from '@/utils';

interface IReturn {
  totalAmount: number;
  items: ICartItem[];
}

export function mapCartToDTO(cart: TCartWithRelations): IReturn {
  const items = cart.items.map((item) => ({
    id: item.id,
    name: item.productVariation.product.name,
    quantity: item.quantity,
    price: calcCartItemTotalPrice(item),
    imageUrl: item.productVariation.product.imageUrl,
    size: item.productVariation.size as TSize | null,
    dough: item.productVariation.dough as TDough | null,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  }));

  return {
    totalAmount: items.reduce((acc, item) => acc + item.price, 0),
    items,
  };
}
