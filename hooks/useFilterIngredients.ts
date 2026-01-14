import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

import { api } from '@/services';

interface IIngredientItem {
  label: string;
  value: string;
}

interface IReturn {
  ingredients: IIngredientItem[];
  loading: boolean;
  selectedIngredients: Set<string>;
  toggleIngredients: (value: string) => void;
}

export function useFilterIngredients(): IReturn {
  const [ingredients, setIngredients] = useState<IIngredientItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>([]));

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await api.ingredients.getAll();

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

  return { ingredients, loading, selectedIngredients, toggleIngredients };
}
