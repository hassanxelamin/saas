'use client';

import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';

import { useSubscriptionStore } from '@/src/store/subscription-store';
import { useUserStore } from '@/src/store/user-store';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const selectedPrice = useSubscriptionStore((state) => state.selectedPrice); // Add this line
  const user = useUserStore((state) => state.user);
  const subscription = useUserStore((state) => state.subscription);

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error: any) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!stripe) {
        throw new Error("Stripe.js hasn't yet loaded.");
      }

      if (!user) {
        throw new Error('No user');
      }

      if (subscription) {
        throw new Error('Subscription exists:', subscription);
      }

      if (!selectedPrice) {
        throw new Error('No price selected');
      }

      setLoading(true);

      if (elements) {
        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
          handleError(submitError);
          return;
        }

        // Create the Subscription
        const res = await fetch('api/create-subscription', {
          method: 'POST',
          body: JSON.stringify({
            userId: user.id,
            price: selectedPrice.id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        let error;
        const { type, clientSecret } = await res.json();

        // Confirm the Subscription using the details collected by the Payment Element

        if (type === 'setup') {
          // Confirm the SetupIntent
          const result = await stripe.confirmSetup({
            elements,
            clientSecret,
            confirmParams: {
              return_url: 'http://localhost:3000',
            },
          });
          error = result.error;
        } else if (type === 'payment') {
          // Confirm the PaymentIntent
          const result = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
              return_url: 'http://localhost:3000',
            },
          });
          error = result.error;
        }

        if (error) {
          // This point is only reached if there's an immediate error when
          // confirming the payment. Show the error to your customer (for example, payment details incomplete)
          handleError(error);
        } else {
          // Your customer is redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer is redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
        }
      } else {
        // handle the case where elements is null
      }
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  const paymentElementOptions: any = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: true,
      spacedAccordionItems: false,
    },
    // fields: {
    //   billingDetails: {
    //     address: 'never',
    //   }
    // },
    terms: {
      card: 'never',
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <PaymentElement options={paymentElementOptions} />
      </div>
      <div className="terms-container">
        <label htmlFor="terms">
          <input type="checkbox" id="terms" name="terms" />I acknowledge that I
          have read and understand the
          <a href="/terms">Terms of Service</a> and
          <a href="/privacy">Privacy Policy</a>.
        </label>
      </div>
      <button
        className="w-full bg-black rounded-full h-[40px] border-[1px] border-black text-white font-medium mt-[10px]"
        type="submit"
        disabled={!stripe || loading}
      >
        Start Your 14 day Free Trial
      </button>
      {errorMessage && <div>{errorMessage}</div>}
      <div>
        <div>Terms Of Service | Privacy Policy | Logout</div>
      </div>
    </form>
  );
}
