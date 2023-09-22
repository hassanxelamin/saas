import { prisma } from '@/src/lib/database';

const getActiveProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      where: {
        active: true,
        prices: {
          every: {
            active: true,
          },
        },
      },
      include: {
        prices: true,
      },
    });

    return products;
  } catch (error) {
    console.error('Error fetching active products: ', error);
    return [];
  }
};

export default getActiveProducts;
