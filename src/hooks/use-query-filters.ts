import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useEffect } from 'react';

import type { IFilters } from '@/hooks';

export function useQueryFilters({
  selectedDough,
  selectedSizes,
  prices,
  selectedIngredients,
}: IFilters) {
  const router = useRouter();

  useEffect(() => {
    const queryString = qs.stringify(
      {
        priceFrom: prices.priceFrom !== 0 ? prices.priceFrom : undefined,
        priceTo: prices.priceTo !== 1000 ? prices.priceTo : undefined,
        dough: Array.from(selectedDough),
        sizes: Array.from(selectedSizes),
        ingredients: Array.from(selectedIngredients),
      },
      {
        arrayFormat: 'comma',
      },
    );

    const currentHash = window.location.hash;

    router.push(`?${queryString}${currentHash}`, { scroll: false });
  }, [prices, selectedDough, selectedIngredients, selectedSizes, router]);
}
