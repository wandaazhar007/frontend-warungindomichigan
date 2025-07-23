'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import styles from './PaymentForm.module.scss';

// Load Stripe with your public key from the .env.local file
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
  clientSecret: string;
  onPaymentSuccess: () => void;
}

// This is the actual form component
const CheckoutForm = ({ clientSecret, onPaymentSuccess }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);
    toast.loading('Processing payment...');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // Prevents redirecting to another page
    });

    toast.dismiss(); // Remove the "Processing..." toast

    if (error) {
      toast.error(error.message || 'An unexpected error occurred.');
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      toast.success('Payment successful!');
      onPaymentSuccess(); // Tell the parent page that payment is complete
    } else {
      toast.error('Payment failed. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={isLoading || !stripe || !elements} className={styles.payButton}>
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

// This is the main component we will import into our CheckoutPage
const PaymentForm = ({ clientSecret, onPaymentSuccess }: CheckoutFormProps) => {
  const options = {
    clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm clientSecret={clientSecret} onPaymentSuccess={onPaymentSuccess} />
    </Elements>
  );
};

export default PaymentForm;