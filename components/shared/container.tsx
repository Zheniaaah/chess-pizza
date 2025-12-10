import React from 'react';

import { cn } from '@/lib';

interface IProps extends React.PropsWithChildren {
  className?: string;
}

export default function Container({ className, children }: IProps) {
  return <div className={cn('mx-auto max-w-7xl', className)}>{children}</div>;
}
