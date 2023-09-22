import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/src/lib/stripe';
import handleSubscriptionEvent from '@/src/handlers/subscriptions/subscriptions';
import handleProductEvent from '@/src/handlers/subscriptions/subscriptions';
import handlePriceEvent from '@/src/handlers/subscriptions/subscriptions';
import handleCheckoutEvent from '@/src/handlers/subscriptions/subscriptions';
// import handlePaymentEvent from './handlers/payments';

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'charge.failed',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

async function handler(req: Request, res: Response) {
    const body = await req.text();
    const sig = headers().get('Stripe-Signature');
  
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;
  
    try {
      if (!sig || !webhookSecret)
        return NextResponse.json({
          error: 'Invalid signature or webhook secret.',
        });
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
      console.error(`Error message:${err.message}`);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Ensure that 'event' is not null before trying to access its properties
    if (relevantEvents.has(event.type)) {
        try { 
          switch (event.type) {
            case 'product.created':
            case 'product.updated':
              await handleProductEvent(event);
              break;
            case 'price.created':
            case 'price.updated':
              await handlePriceEvent(event);
              break;
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                console.log("event happened")
                await handleSubscriptionEvent(event);
                break;
            // case 'invoice.payment_succeeded':
            // case 'invoice.payment_failed':
            //   await handlePaymentEvent(event);
            //   break;
            case 'checkout.session.completed':
                await handleCheckoutEvent(event);
                break;
            case 'charge.failed':
                await handleFailedPayEvent(event);
                break;
            default:
              return NextResponse.json({
                  received: false,
                  message: `Unrecognized event type: ${event.type}`
              }, { status: 400 });
          }
        } catch (error) {
            console.error(`Unexpected error: ${error}`);
            return new NextResponse(
                'Webhook error: "Webhook handler failed. View logs."',
                { status: 400 }
            );
        }
        return NextResponse.json({
          received: true,
          message: 'Event received'
        }, { status: 200 });
    } else {
        return NextResponse.json({
          received: false,
          message: 'Event object is null'
        }, { status: 400 });
    }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;