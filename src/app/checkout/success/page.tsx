'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Container from '@/components/Container/Container';
import styles from './SuccessPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const OrderSuccessPage = () => {
  const { clearCart } = useCart();

  // When this page loads, it means the payment was successful.
  // We should clear the cart and remove the saved shipping address.
  useEffect(() => {
    clearCart();
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className={styles.successPage}>
      <Container>
        <div className={styles.successBox}>
          <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />
          <h1>Thank You for Your Order!</h1>
          <p>Your payment was successful and your order is being processed.</p>
          <p>A confirmation email has been sent to you.</p>
          <Link href="/products" className={styles.ctaButton}>
            Continue Shopping
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default OrderSuccessPage;
