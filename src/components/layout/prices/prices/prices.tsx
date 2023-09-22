import Plans from '@/src/components/layout/prices/plans/plans';
import getActiveProducts from '@/src/handlers/getActiveProducts';
import { Product } from '@/src/types-db';

export default async function Prices() {
  let products: Product[] = [];

  try {
    products = await getActiveProducts();
  } catch (error) {
    console.error('An error occurred:', error);
  }

  return (
    <section className="flex justify-center items-center space-x-[10rem] h-[518px] w-full border-b-[2px] border-black bg-secondary-color mb-[4.5rem]">
      <div className="w-[566px] h-[367px] bg-white rounded-[30px] border-l-[4px] border-r-[4px] border-t-[4px] border-b-[4px] border-black" />
      <Plans products={products} />
    </section>
  );
}
