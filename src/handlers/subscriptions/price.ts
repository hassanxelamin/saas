import Stripe from 'stripe';
import {
    upsertPriceRecord,
  } from '@/src/lib/database';
  

async function handlePriceEvent(event: Stripe.Event) {
    await upsertPriceRecord(event.data.object as Stripe.Price);
}

export default handlePriceEvent;