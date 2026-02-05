'use client';

import type { Ingredient, ProductVariation } from '@prisma/client';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import React from 'react';

import { Button, DialogDescription, DialogTitle } from '@/components/ui';
import { DOUGH } from '@/constants';
import { usePizzaOptions } from '@/hooks';
import type { TDough, TSize } from '@/types';
import { cn } from '@/utils';

import IngredientCard from './ingredient-card';
import ProductImage from './product-image';
import Title from './title';
import VariantsGroup from './variants-group';

interface IProps {
  name: string;
  imageUrl: string;
  variations?: ProductVariation[];
  ingredients?: Ingredient[];
  onAddToCart?: () => void;
  className?: string;
}

export default function ProductForm({
  variations,
  ingredients,
  name,
  imageUrl,
  onAddToCart,
  className,
}: IProps) {
  const {
    selectedSize,
    setSelectedSize,
    selectedDough,
    setSelectedDough,
    selectedIngredients,
    toggleIngredient,
    textDetails,
    availableSizes,
    totalPizzaPrice,
  } = usePizzaOptions(variations, ingredients);

  const handleClickAdd = () => {
    onAddToCart?.();
    console.log({
      selectedSize,
      selectedDough,
      selectedIngredients,
    });
  };

  return (
    <div className={cn('flex', className)}>
      <ProductImage src={imageUrl} alt={name} size={variations ? selectedSize : undefined} />

      <div className="flex w-[490px] flex-col bg-[#F4F1EE] p-7">
        <VisuallyHidden>
          <DialogTitle>Інформація про продукт</DialogTitle>
          <DialogDescription>Виберіть розмір, тісто та додаткові інгредієнти</DialogDescription>
        </VisuallyHidden>

        <Title size="md" className="font-extrabold">
          {name}
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

        <Button onClick={handleClickAdd} className="mt-auto h-14 w-full rounded-2xl px-10">
          Додати у кошик за {totalPizzaPrice} ₴
        </Button>
      </div>
    </div>
  );
}
