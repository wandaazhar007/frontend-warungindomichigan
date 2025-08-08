// 'use client';

// import { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import toast from 'react-hot-toast';
// import styles from './PaymentForm.module.scss';

// // Load Stripe with your public key from the .env.local file
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// interface CheckoutFormProps {
//   clientSecret: string;
//   onPaymentSuccess: () => void;
// }

// // This is the actual form component
// const CheckoutForm = ({ clientSecret, onPaymentSuccess }: CheckoutFormProps) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       return;
//     }

//     setIsLoading(true);
//     toast.loading('Processing payment...');

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       redirect: 'if_required', // Prevents redirecting to another page
//     });

//     toast.dismiss(); // Remove the "Processing..." toast

//     if (error) {
//       toast.error(error.message || 'An unexpected error occurred.');
//       setIsLoading(false);
//     } else if (paymentIntent && paymentIntent.status === 'succeeded') {
//       toast.success('Payment successful!');
//       onPaymentSuccess(); // Tell the parent page that payment is complete
//     } else {
//       toast.error('Payment failed. Please try again.');
//     }

//     setIsLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button disabled={isLoading || !stripe || !elements} className={styles.payButton}>
//         {isLoading ? 'Processing...' : 'Pay Now'}
//       </button>
//     </form>
//   );
// };

// // This is the main component we will import into our CheckoutPage
// const PaymentForm = ({ clientSecret, onPaymentSuccess }: CheckoutFormProps) => {
//   const options = {
//     clientSecret,
//   };

//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckoutForm clientSecret={clientSecret} onPaymentSuccess={onPaymentSuccess} />
//     </Elements>
//   );
// };

// export default PaymentForm;

'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import styles from './PaymentForm.module.scss';

// Ensure you load Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
  onPaymentSuccess: () => void;
}

const CheckoutForm = ({ onPaymentSuccess }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  // This effect will listen for payment success on redirect
  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");
        onPaymentSuccess();
      }
    });
  }, [stripe, onPaymentSuccess]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading('Processing payment...');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // This is the URL Stripe will redirect back to after payment
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    toast.dismiss(toastId);

    // This point will only be reached if there is an immediate error.
    // Otherwise, the user is redirected.
    if (error.type === "card_error" || error.type === "validation_error") {
      toast.error(error.message || 'An unexpected error occurred.');
    } else {
      toast.error('An unexpected error occurred.');
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

// This is the wrapper component that provides the Stripe context
interface PaymentFormProps {
  clientSecret: string;
  onPaymentSuccess: () => void;
}

const PaymentForm = ({ clientSecret, onPaymentSuccess }: PaymentFormProps) => {
  const options = {
    clientSecret,
    appearance: { theme: 'stripe' as const },
  };

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm onPaymentSuccess={onPaymentSuccess} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentForm;