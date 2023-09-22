import Stripe from 'stripe';
import { stripe } from '@/src/lib/stripe';
import { prisma } from '@/src/lib/database/db/db';

const upsertProductRecord = async (product: Stripe.Product) => {
  const productData = {
    id: product.id,
    active: product.active,
    name: product.name,
    metadata: product.metadata,
  };

  await prisma.product.upsert({
    where: { id: product.id },
    update: productData,
    create: productData,
  });
};

const upsertPriceRecord = async (price: Stripe.Price) => {
  const priceData = {
    id: price.id,
    productId: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    type: price.type,
    unit_amount: price.unit_amount ?? undefined,
    interval: price.recurring?.interval,
    interval_count: price.recurring?.interval_count,
    trial_period_days: price.recurring?.trial_period_days,
    metadata: price.metadata,
  };

  await prisma.price.upsert({
    where: { id: price.id },
    update: priceData,
    create: priceData,
  });
};

const createOrRetrieveCustomer = async ({
  email,
  clerkUserId,
}: {
  email: string;
  clerkUserId: string;
}) => {
  // Find the user first
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    throw new Error('No user found with this Clerk User ID');
  }

  // Check if customer exists for this user
  let customer = await prisma.customer.findUnique({
    where: { userId: user.id },
  });

  if (!customer) {
    const stripeCustomer = await stripe.customers.create({
      email,
      metadata: { clerkUserId },
    });

    // Create a new customer associated with the found user
    customer = await prisma.customer.create({
      data: {
        stripeCustomerId: stripeCustomer.id,
        email,
        user: { connect: { id: user.id } },
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { customerId: customer.stripeCustomerId },
    });

    return updatedUser; // This is the updated user
  }

  return user; // This is the original user
};

// const copyBillingDetailsToCustomer = async (clerkUserId: string, payment_method: Stripe.PaymentMethod) => {
//     //Todo: check this assertion
//     const customer = payment_method.customer as string;
//     const { name, phone, address } = payment_method.billing_details;
//     if (!name || !phone || !address) return;

//     function mapNullToUndefined(obj: any): any {
//         return Object.entries(obj).reduce((acc: any, [key, value]) => {
//           acc[key] = value === null ? undefined : value;
//           return acc;
//         }, {} as any); // or as Record<string, any>
//       }

//     await stripe.customers.update(customer, { name, phone, address: mapNullToUndefined(address) });

//     // Fetch the user to get the customerId
//     const user = await prisma.user.findUnique({
//         where: { id: clerkUserId },
//         select: { customerId: true }
//     });

//     if (!user || !user.customerId) return;

//     // Update the customer with the new billingAddress and paymentMethod
//     await prisma.customer.update({
//         where: { id: user.customerId },
//         data: { billingAddress: { ...address }, paymentMethod: JSON.stringify(payment_method)  }
//     });
// };

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  stripeCustomerId: string
) => {
  const customer = await prisma.customer.findUnique({
    where: { stripeCustomerId },
    include: { user: true }, // Include User data
  });

  if (!customer) throw new Error('No customer found');

  // const { clerkUserId } = customer.user; // Accessing clerkUserId from User

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method'],
  });

  const subscriptionData = {
    id: subscription.id,
    customerId: customer.id,
    metadata: subscription.metadata,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    quantity: subscription.items.data[0].quantity,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    cancelAt: subscription.cancel_at
      ? new Date(subscription.cancel_at * 1000)
      : null,
    canceledAt: subscription.canceled_at
      ? new Date(subscription.canceled_at * 1000)
      : null,
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    created: new Date(subscription.created * 1000),
    endedAt: subscription.ended_at
      ? new Date(subscription.ended_at * 1000)
      : null,
    trialStart: subscription.trial_start
      ? new Date(subscription.trial_start * 1000)
      : null,
    trialEnd: subscription.trial_end
      ? new Date(subscription.trial_end * 1000)
      : null,
  };

  await prisma.subscription.upsert({
    where: { id: subscription.id },
    update: subscriptionData,
    create: subscriptionData,
  });
};

export {
  upsertProductRecord,
  upsertPriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
};
