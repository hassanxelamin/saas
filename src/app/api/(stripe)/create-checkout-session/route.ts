// import { NextResponse } from 'next/server';
// import { stripe } from '@/src/lib/stripe';
// import { prisma, createOrRetrieveCustomer } from '@/src/lib/database';
// import { getUrl } from '@/src/lib/helpers/helpers';

// export async function POST(request: Request) {
// const { price, quantity = 1, metadata = {} } = await request.json();
// try {
//   const userId = request.headers.get('userId');
//   if (!userId) {
//     throw new Error('User ID is missing');
//   }
//   // Fetch user from your database using Prisma
//   const user = await prisma.user.findUnique({
//     where: { clerkUserId: userId },
//   });
//   if (!user) {
//     throw new Error('User not found');
//   }
//   // Retrieve or create a new customer
//   const customer = await createOrRetrieveCustomer({
//     email: user.email,
//     clerkUserId: user.clerkUserId,
//   });
//   // Create a new Checkout Session for the order
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     billing_address_collection: 'required',
//     customer,
//     line_items: [
//       {
//         price: price.id,
//         quantity,
//       },
//     ],
//     mode: 'subscription',
//     allow_promotion_codes: true,
//     subscription_data: {
//       trial_from_plan: true,
//       metadata,
//     },
//     success_url: `${getUrl()}/account`,
//     cancel_url: `${getUrl()}/`,
//   });
//   // Send back the session ID
//   return NextResponse.json({ sessionId: session.id });
// } catch (err: any) {
//   console.error(err);
//   return new NextResponse('Internal Error', { status: 500 });
// }
// }

export async function POST(request: Request): Promise<void> {
  console.log(`Received a ${request.method} request.`);
}
