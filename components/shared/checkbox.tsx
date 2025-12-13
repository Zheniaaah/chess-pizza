import React from 'react';

import { Checkbox as CheckboxShadcn } from '@/components/ui';

export interface ICheckboxProps {
  label: string;
  value: string;
  name?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  endAdornment?: React.ReactNode;
}

export default function Checkbox({
  label,
  value,
  name,
  checked,
  onCheckedChange,
  endAdornment,
}: ICheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <CheckboxShadcn
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
