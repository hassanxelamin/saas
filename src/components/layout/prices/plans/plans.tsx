'use client';

import PriceBox from '@/src/components/layout/prices/price-box/price-box';
import { Product } from '@/src/types-db';

interface PlansProps {
  products: Product[];
}

export default function Plans({ products }: PlansProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      {products.map((product: any) =>
        product.prices.map((price: any, priceIndex: any) => {
          const displayPrice = `${(price.unit_amount / 100).toFixed(2)} USD/${
            price.interval
          }`;
          return (
            <PriceBox
              key={price.id}
              id={price.id}
              price={price}
              color={priceIndex === 0 ? 'bg-white' : 'bg-white'}
              borderColor={
                priceIndex === 0
                  ? 'border-gray-100'
                  : 'border-black border-opacity-20'
              }
              details={{
                plan: `Annual`,
                trial: '14 days free',
                price: displayPrice,
              }}
            />
          );
        })
      )}
    </div>
  );
}
