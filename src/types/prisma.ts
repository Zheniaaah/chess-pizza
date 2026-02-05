import type { Ingredient, Product, ProductVariation } from '@prisma/client';

export interface IProductWithRelations extends Product {
  ingredients: Ingredient[];
  variations: ProductVariation[];
}
