import '../globals.css';

import type { Metadata } from 'next';
import React from 'react';

import { Header } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        {children}

        {modal}
      </main>
    </>
  );
}
