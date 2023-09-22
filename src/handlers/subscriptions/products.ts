import Stripe from 'stripe';
import {
    upsertProductRecord,
  } from '@/src/lib/database';
  

async function handleProductEvent(event: Stripe.Event) {
    await upsertProductRecord(event.data.object as Stripe.Product);
}

export default handleProductEvent;