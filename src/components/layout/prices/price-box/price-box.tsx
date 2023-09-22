'use client';

import React from 'react';
import { useSubscriptionStore } from '@/src/store/subscription-store';
import { BoxProps } from '@/src/types-db';

export default function PriceBox({
  id,
  color = 'white',
  borderColor,
  details,
  price,
}: BoxProps) {
  const selectedSubscription = useSubscriptionStore(
    (state) => state.selectedSubscription
  );
  const selectSubscription = useSubscriptionStore(
    (state) => state.selectSubscription
  );
  const selectPrice = useSubscriptionStore((state) => state.selectPrice);
  const isSelected = selectedSubscription === id;

  const { plan } = details;
  // const { trial } = details;
  const priceDetails = details.price;

  const handleClick = () => {
    selectSubscription(id);
    selectPrice(price);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (['Enter', 'NumpadEnter', ' '].includes(e.key)) {
      selectSubscription(id);
      selectPrice(price);
    }
  };

  return (
    <div
      className={`flex font-bold items-center justify-between p-[2rem] w-[368px] h-[105px] rounded-[1rem] ${color} border-[2px] ${borderColor} mb-[10px] cursor-pointer`}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex={0} // This makes the div focusable
      role="checkbox" // This communicates the semantics
      aria-checked={isSelected} // This communicates the state
    >
      <div
        className={`flex items-center justify-center w-[26px] h-[25px] bg-white rounded-full border border-black ${
          isSelected ? 'bg-black' : ''
        }`}
      >
        {isSelected && '✓'}
      </div>
      <div className="flex w-full justify-between">
        <div>{plan}</div>
        {/* <div>{trial}</div> */}
        <div>{priceDetails}</div>
      </div>
    </div>
  );
}
