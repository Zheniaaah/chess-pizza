import React from 'react';

import { Checkbox, CheckboxesGroup } from '@/components/shared';
import { Input, RangeSlider } from '@/components/ui';

import Title from './title';

interface IProps {
  className?: string;
}

export default function Filters({ className }: IProps) {
  const renderedIngredients = [
    {
      label: 'Сирний соус',
      value: '1',
    },
    {
      label: 'Моцарелла',
      value: '2',
    },
    {
      label: 'Часник',
      value: '3',
    },
    {
      label: 'Солені огірки',
      value: '4',
    },
    {
      label: 'Червона цибуля',
      value: '5',
    },
    {
      label: 'Томати',
      value: '6',
    },
  ];

  const ingredients = [
    {
      label: 'Сирний соус',
      value: '1',
    },
    {
      label: 'Моцарелла',
      value: '2',
    },
    {
      label: 'Часник',
      value: '3',
    },
    {
      label: 'Солені огірки',
      value: '4',
    },
    {
      label: 'Червона цибуля',
      value: '5',
    },
    {
      label: 'Томати',
      value: '6',
    },
    {
      label: 'Сирний соус',
      value: '1',
    },
    {
      label: 'Моцарелла',
      value: '2',
    },
    {
      label: 'Часник',
      value: '3',
    },
    {
      label: 'Солені огірки',
      value: '4',
    },
    {
      label: 'Червона цибуля',
      value: '5',
    },
    {
      label: 'Томати',
      value: '6',
    },
  ];

  return (
    <div className={className}>
      <Title size="sm" className="mb-5 font-bold">
        Фільтрація
      </Title>

      <div className="flex flex-col gap-4">
        <Checkbox label="Можна сбирати" value="1" />

        <Checkbox label="Новинки" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="mb-3 font-bold">Ціна від і до:</p>

        <div className="mb-5 flex gap-3">
          <Input type="number" placeholder="0" min={0} max={1000} defaultValue={0} />

          <Input type="number" placeholder="1000" min={100} max={1000} />
        </div>

        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />

        <CheckboxesGroup
          title="Інгредієнти"
          items={ingredients}
          renderedItems={renderedIngredients}
          limit={6}
          defaultValues={ingredients}
          className="mt-5"
        />
      </div>
    </div>
  );
}
