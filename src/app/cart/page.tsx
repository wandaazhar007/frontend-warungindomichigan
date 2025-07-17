// 'use client';

// import { useCart } from '@/context/CartContext';
// import Link from 'next/link';
// import Image from 'next/image';
// import Container from '@/components/Container/Container';
// import QuantitySelector from '@/components/QuantitySelector/QuantitySelector'; // <-- IMPORT NEW COMPONENT
// import styles from './CartPage.module.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

// const CartPage = () => {
//   const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

//   return (
//     <div className={styles.cartPage}>
//       <Container>
//         <h1>Shopping Cart</h1>
//         {cartItems.length === 0 ? (
//           <div className={styles.emptyCart}>
//             <p>Your cart is currently empty.</p>
//             <Link href="/products" className={styles.ctaButton}>Continue Shopping</Link>
//           </div>
//         ) : (
//           <div className={styles.cartGrid}>
//             <div className={styles.cartItems}>
//               {cartItems.map(item => (
//                 <div key={item.id} className={styles.cartItem}>
//                   <div className={styles.itemImage}>
//                     <Image src={item.imageUrl || '/placeholder.png'} alt={item.name} fill style={{ objectFit: 'cover' }} />
//                   </div>
//                   <div className={styles.itemDetails}>
//                     <h3>{item.name}</h3>
//                     <p>${(item.price / 100).toFixed(2)}</p>
//                   </div>
//                   <div className={styles.itemActions}>
//                     {/* --- THIS IS THE KEY CHANGE --- */}
//                     <QuantitySelector
//                       quantity={item.quantity}
//                       onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
//                       onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
//                     />
//                     <button onClick={() => removeFromCart(item.id)} className={styles.removeButton} aria-label="Remove item">
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </div>
//                   <div className={styles.itemTotal}>
//                     ${((item.price * item.quantity) / 100).toFixed(2)}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className={styles.cartSummary}>
//               <h2>Order Summary</h2>
//               <div className={styles.summaryRow}>
//                 <span>Subtotal</span>
//                 <span>${(cartTotal / 100).toFixed(2)}</span>
//               </div>
//               <div className={styles.summaryRow}>
//                 <span>Shipping</span>
//                 <span>Calculated at next step</span>
//               </div>
//               <div className={`${styles.summaryRow} ${styles.totalRow}`}>
//                 <span>Total</span>
//                 <span>${(cartTotal / 100).toFixed(2)}</span>
//               </div>
//               {/* <button className={styles.ctaButton}>Proceed to Checkout</button> */}
//               <Link href="/checkout" className={styles.ctaButton}>
//                 Proceed to Checkout
//               </Link>
//             </div>
//           </div>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default CartPage;



'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/Container/Container';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
import styles from './CartPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons'; // Import spinner icon

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  // Function to handle the checkout button click
  const handleProceedToCheckout = () => {
    setIsNavigating(true);
    // Set a 1-second delay before navigating
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

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

              {/* --- UPDATED BUTTON --- */}
              <button
                onClick={handleProceedToCheckout}
                className={styles.ctaButton}
                disabled={isNavigating}
              >
                {isNavigating ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  'Proceed to Checkout'
                )}
              </button>

              {/* --- NEW PAYMENT METHODS SECTION --- */}
              <div className={styles.paymentMethods}>
                <span>We accept</span>
                <div className={styles.paymentIcons}>
                  <Image src="/amex.svg" alt="American Express" width={40} height={25} />
                  <Image src="/discover.svg" alt="Discover" width={40} height={25} />
                  <Image src="/mastercard.svg" alt="Mastercard" width={40} height={25} />
                  <Image src="/visa.svg" alt="Visa" width={40} height={25} />
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
