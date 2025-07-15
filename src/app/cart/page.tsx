'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/Container/Container';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector'; // <-- IMPORT NEW COMPONENT
import styles from './CartPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className={styles.cartPage}>
      <Container>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your cart is currently empty.</p>
            <Link href="/products" className={styles.ctaButton}>Continue Shopping</Link>
          </div>
        ) : (
          <div className={styles.cartGrid}>
            <div className={styles.cartItems}>
              {cartItems.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image src={item.imageUrl || '/placeholder.png'} alt={item.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <p>${(item.price / 100).toFixed(2)}</p>
                  </div>
                  <div className={styles.itemActions}>
                    {/* --- THIS IS THE KEY CHANGE --- */}
                    <QuantitySelector
                      quantity={item.quantity}
                      onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                      onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                    />
                    <button onClick={() => removeFromCart(item.id)} className={styles.removeButton} aria-label="Remove item">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <div className={styles.itemTotal}>
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cartSummary}>
              <h2>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${(cartTotal / 100).toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>${(cartTotal / 100).toFixed(2)}</span>
              </div>
              <button className={styles.ctaButton}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
