import Stripe from 'stripe';
import {
    manageSubscriptionStatusChange,
  } from '@/src/lib/database';
  

async function handleCheckoutEvent(event: Stripe.Event) {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
if (checkoutSession.mode === 'subscription') {
  const subscriptionId = checkoutSession.subscription;
  await manageSubscriptionStatusChange(
    subscriptionId as string,
    checkoutSession.customer as string
  );
}
}

export default handleCheckoutEvent;