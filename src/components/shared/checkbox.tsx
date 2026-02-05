import React from 'react';

import { Checkbox as CheckboxShadcn } from '@/components/ui';
import { cn } from '@/utils';

export interface ICheckboxProps {
  value: string;
  label: string;
  name?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  showAll?: boolean;
  endAdornment?: React.ReactNode;
}

export default function Checkbox({
  value,
  label,
  name,
  checked,
  onCheckedChange,
  showAll = true,
  endAdornment,
}: ICheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <CheckboxShadcn
        id={`checkbox-${name}-${value}`}
        value={value}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="h-6 w-6 cursor-pointer rounded-lg"
      />

      <label
        htmlFor={`checkbox-${name}-${value}`}
        className={cn('flex-1 cursor-pointer leading-none', !showAll && 'truncate')}
      >
        {label}
      </label>

      {endAdornment}
    </div>
  );
}
