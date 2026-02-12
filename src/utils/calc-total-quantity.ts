import type { ICartItem } from '@/types';

export function calcTotalQuantity(items: ICartItem[]): number {
  return items.reduce((acc, item) => acc + item.quantity, 0);
}
