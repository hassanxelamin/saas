// import { NextResponse } from 'next/server';
// import { stripe } from '@/src/lib/stripe';
// import { prisma, createOrRetrieveCustomer } from '@/src/lib/database';
// import { getUrl } from '@/src/lib/helpers/helpers';

// export async function POST(request: Request) {
// try {
//   const userId = request.headers.get('userId');
//   if (!userId) {
//     throw new Error('User ID is missing');
//   }
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   });
//   if (!user) {
//     throw new Error('User not found');
//   }
//   // Retrieve or create a new customer
//   const customer = await createOrRetrieveCustomer({
//     email: user.email,
//     clerkUserId: user.clerkUserId,
//   });
//   if (!customer) {
//     throw new Error('Could not get customer');
//   }
//   const { url } = await stripe.billingPortal.sessions.create({
//     customer,
//     return_url: `${getUrl()}/account`,
//   });
//   return NextResponse.json({ url });
// } catch (err: any) {
//   console.error(err);
//   return new NextResponse('Internal Error', { status: 500 });
// }
// }

export async function POST(request: Request): Promise<void> {
  console.log(`Received a ${request.method} request.`);
}
