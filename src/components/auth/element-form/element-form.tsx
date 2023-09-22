'use client';

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/src/components/payment/checkout-form/checkout-form';

const stripePromise = loadStripe(
  'pk_test_51NOCAzAAIYQcbfemP8Ki4EfyGszGluEAtXzjppa26qNB2Kb3CKPwE9bNGR9uyMxbWoyh5jWzBC6DxV1ycFU035pq00SAfWlKfW'
);

export default function ElementForm() {
  const options: any = {
    mode: 'subscription' as 'subscription',
    amount: 0,
    currency: 'usd',
    appearance: {
      theme: 'minimal' as 'minimal',
      variables: {
        colorPrimary: '#0570de',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        borderColor: '#000',
      },
      rules: {
        '.Input': {
          border: '1px solid #000',
          borderRadius: '10px',
        },
        '.Button': {
          color: 'black',
        },
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}
