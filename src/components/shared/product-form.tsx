'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { Button, DialogDescription, DialogTitle } from '@/components/ui';
import { DOUGH } from '@/constants';
import { usePizzaOptions } from '@/hooks';
import { useCartStore } from '@/store/cart';
import type { TDough, TProductWithRelations, TSize } from '@/types';
import { cn } from '@/utils';

import IngredientCard from './ingredient-card';
import ProductImage from './product-image';
import Title from './title';
import VariantsGroup from './variants-group';

interface IProps {
  product: TProductWithRelations;
  className?: string;
}

export default function ProductForm({ product, className }: IProps) {
  const router = useRouter();
  const { loading, addCartItem } = useCartStore(
    useShallow((state) => ({
      loading: state.loading,
      addCartItem: state.addCartItem,
    })),
  );

  const firstVariation = product.variations[0];
  const isPizza = Boolean(firstVariation.dough);
  const { variations, ingredients } = isPizza
    ? product
    : { variations: undefined, ingredients: undefined };

  const {
    selectedSize,
    setSelectedSize,
    selectedDough,
    setSelectedDough,
    selectedIngredients,
    toggleIngredient,
    textDetails,
    availableSizes,
    selectedVariationId,
    totalPizzaPrice,
  } = usePizzaOptions(variations, ingredients);

  const handleClickAdd = async () => {
    try {
      await addCartItem({
        productVariationId: selectedVariationId || firstVariation.id,
        ingredientsIds: Array.from(selectedIngredients).length
          ? Array.from(selectedIngredients)
          : undefined,
      });
      toast.success('Товар успішно додано у кошик');
      router.back();
    } catch (e) {
      console.error(e);
      toast.error('Не вдалося додати товар у кошик');
    }
  };

  return (
    <div className={cn('flex', className)}>
      <ProductImage
        src={product.imageUrl}
        alt={product.name}
        size={variations ? selectedSize : undefined}
      />

      <div className="flex w-[490px] flex-col bg-[#F4F1EE] p-7">
        <VisuallyHidden>
          <DialogTitle>Інформація про продукт</DialogTitle>
          <DialogDescription>Виберіть розмір, тісто та додаткові інгредієнти</DialogDescription>
        </VisuallyHidden>

        <Title size="md" className="font-extrabold">
          {product.name}
        </Title>

        <p className="mt-1 text-gray-400">{textDetails}</p>

        {variations && (
          <>
            <div className="mt-5 flex flex-col gap-2.5">
              <VariantsGroup
                variants={availableSizes}
                selectedValue={selectedSize}
                onClick={(value) => setSelectedSize(value as TSize)}
              />

              <VariantsGroup
                variants={DOUGH}
                selectedValue={selectedDough}
                onClick={(value) => setSelectedDough(value as TDough)}
              />
            </div>

            <div className="scrollbar mt-5 grid max-h-[324px] grid-cols-3 gap-3 overflow-auto rounded-2xl bg-gray-50 p-5 select-none">
              {ingredients?.map((ingredient) => (
                <IngredientCard
                  key={ingredient.id}
                  name={ingredient.name}
                  price={ingredient.price}
                  imageUrl={ingredient.imageUrl}
                  isActive={selectedIngredients.has(ingredient.id)}
                  onClick={() => toggleIngredient(ingredient.id)}
                />
              ))}
            </div>
          </>
        )}

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="mt-auto h-14 w-full rounded-2xl px-10"
        >
          Додати у кошик за {totalPizzaPrice || firstVariation.price} ₴
        </Button>
      </div>
    </div>
  );
}
