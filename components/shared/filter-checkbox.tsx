import React from 'react';

import { Checkbox } from '@/components/ui';

export interface IFilterCheckboxProps {
  label: string;
  value: string;
  name?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  endAdornment?: React.ReactNode;
}

export default function FilterCheckbox({
  label,
  value,
  name,
  checked,
  onCheckedChange,
  endAdornment,
}: IFilterCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        id={`checkbox-${name}-${value}`}
        className="h-6 w-6 cursor-pointer rounded-[8px]"
      />

      <label htmlFor={`checkbox-${name}-${value}`} className="flex-1 cursor-pointer leading-none">
        {label}
      </label>

      {endAdornment}
    </div>
  );
}
