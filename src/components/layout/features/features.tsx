/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */

'use client';

import { useUnique } from '@/src/hooks/use-unique';

const NUM_FEATURE_CARDS = 4;

export default function Features() {
  return (
    <section className="flex flex-col justify-center items-center space-y-[6.9rem] h-[598px] w-full border-b-[2px] border-black">
      <h2 className="font-mobil w-[800px] h-[87px] text-[4.5rem] leading-[5.5rem] text-center">
        Redefining how brands and consumers interact through text
      </h2>
      <div className="flex space-x-[3.5rem]">
        {[...Array(NUM_FEATURE_CARDS)].map((_, i) => {
          return (
            <div
              key={i}
              className="card w-[215px] h-[310px] rounded-2xl border-[0.3rem] border-black"
            />
          );
        })}
      </div>
    </section>
  );
}
