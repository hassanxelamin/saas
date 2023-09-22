import { NextRequest, NextResponse } from 'next/server';
import { prisma, createOrRetrieveCustomer } from '@/src/lib/database';
import { stripe } from '@/src/lib/stripe';

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { price } = requestBody;
  const { clerkSessionId } = requestBody;

  try {
    const user = await prisma.user.findFirst({
      where: { clerkUserId: clerkSessionId },
    });

    console.log(user)

    if (!user) {
      throw new Error('User missing');
    }
    // Retrieve or create a new customer
    const customer = await createOrRetrieveCustomer({
      email: user.email,
      clerkUserId: user.clerkUserId,
    });

    if (!customer) {
      // No customer associated with this user, therefore no subscription.
      throw new Error('Customer could not be created');
    }

    if (!customer.customerId) {
      // No customer associated with this user, therefore no subscription.
      return NextResponse.json({ subscription: null });
    }

    // const subscription = await prisma.subscription.findFirst({
    //   where: {
    //     AND: [
    //       { customerId: user.customerId },
    //       { status: { in: ['active', 'trialing'] } },
    //     ],
    //   },
    //   include: {
    //     customer: true,
    //     price: true,
    //   },
    // });

    // return NextResponse.json({ subscription });

    // const userId = request.headers.get('userId');

    // if (!userId) {
    //   throw new Error('User ID is missing');
    // }

    // // Fetch user from your database using Prisma
    // const user = await prisma.user.findUnique({
    //   where: { clerkUserId: userId },
    // });

    const subscription = await stripe.subscriptions.create({
      customer: customer.customerId,
      items: [
        {
          price,
        },
      ],
      trial_period_days: 7,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
    });

    if (
      subscription.pending_setup_intent !== null &&
      typeof subscription.pending_setup_intent !== 'string'
    ) {
      return new NextResponse(
        JSON.stringify({
          type: 'setup',
          clientSecret: subscription.pending_setup_intent.client_secret,
        })
      );
    }
    if (
      subscription.latest_invoice &&
      typeof subscription.latest_invoice !== 'string' &&
      subscription.latest_invoice.payment_intent &&
      typeof subscription.latest_invoice.payment_intent !== 'string'
    ) {
      return new NextResponse(
        JSON.stringify({
          type: 'payment',
          clientSecret:
            subscription.latest_invoice?.payment_intent?.client_secret,
        })
      );
    }
  } catch (err: any) {
    // console.error(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
