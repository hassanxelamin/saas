import Stripe from 'stripe';
import { clerkClient } from '@clerk/nextjs';
import { prisma } from '@/src/lib/database/db/db';
import { NextResponse } from 'next/server';
import {
    manageSubscriptionStatusChange,
  } from '@/src/lib/database';
  

async function handleSubscriptionEvent(event: Stripe.Event) {
  console.log('okay')
    // Extract the subscription data from the event payload.
    const subscription = event.data.object as Stripe.Subscription;
    console.log(subscription)
  
    // Handle some aspects of the subscription status change.
    await manageSubscriptionStatusChange(
      subscription.id,
      subscription.customer as string
    );
  
    // Retrieve the customer's Stripe ID from the subscription object.
    const customerStripeId = subscription.customer as string;
  
    // Fetch the corresponding customer from the database using Prisma.
    const customer = await prisma.customer.findUnique({
      where: {
        stripeCustomerId: customerStripeId,
      },
      include: {
        user: true, // Also fetch the related User.
      },
    });
  
    // If no matching customer or user is found in the database, log an error.
    if (!customer || !customer.user) {
      console.error(
        `No matching user for customer with Stripe ID ${customerStripeId}`
      );
      return new NextResponse('Webhook error: No matching user', {
        status: 400,
      });
    }
  
    // Fetch the user record using the user ID from the customer record.
    const user = await prisma.user.findUnique({
      where: { id: customer.userId },
    });
  
    // If the user record is not found, throw an error.
    if (!user) {
      throw new Error('User not found');
    }
  
    // Fetch the user's Clerk user ID from the user record.
    const { clerkUserId } = user;
  
    // Determine the user's current subscription status.
    const subscriptionOrNot = await prisma.subscription.findFirst({
      where: { customerId: customer.id },
      orderBy: { createdAt: 'desc' },
    });
  
    // Check if the subscription status is 'active'.
    const isSubscribed =
      subscriptionOrNot && subscriptionOrNot.status === 'active';

    const isTrialing =
      subscriptionOrNot && subscriptionOrNot.status === 'trialing';
  
    // Update the user's metadata in Clerk based on their subscription status.
    if (isTrialing) {
      await clerkClient.users.updateUser(clerkUserId, {
        privateMetadata: { isSubscribed: true },
      });
    } else if (!isSubscribed) {
      await clerkClient.users.updateUser(clerkUserId, {
        privateMetadata: { isSubscribed: false },
      });
    } else {
      await clerkClient.users.updateUser(clerkUserId, {
        privateMetadata: { isSubscribed: true },
      });
    }
  }

export default handleSubscriptionEvent;