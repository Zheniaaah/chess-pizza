export const API_ROUTES = {
  SEARCH_PRODUCTS: '/products/search',
  INGREDIENTS: '/ingredients',
  CART: '/cart',
  CART_ITEM: (id: number) => `/cart/${id}`,
} as const;
