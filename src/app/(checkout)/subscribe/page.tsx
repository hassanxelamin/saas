import React from 'react';
import Plans from '@/src/components/layout/prices/plans/plans';
import getActiveProducts from '@/src/handlers/getActiveProducts';
import { Product } from '@/src/types-db';

import ElementForm from '@/components/auth/element-form/element-form';

export default async function SubscribePage() {
  let products: Product[] = [];

  try {
    products = await getActiveProducts();
  } catch (error) {
    console.error('An error occurred:', error);
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-[368px]">
        <Plans products={products} />
        <ElementForm />
      </div>
    </div>
  );
}
