import { useEffect, useState } from 'react';

import { api } from '@/services';

interface IIngredientItem {
  label: string;
  value: string;
}

interface IReturn {
  ingredients: IIngredientItem[];
  loading: boolean;
}

export function useIngredients(): IReturn {
  const [ingredients, setIngredients] = useState<IIngredientItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await api.ingredients.fetchAll();

        const formatedIngredients: IIngredientItem[] = response.map((ingredient) => ({
          value: String(ingredient.id),
          label: ingredient.name,
        }));

        setIngredients(formatedIngredients);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { ingredients, loading };
}
