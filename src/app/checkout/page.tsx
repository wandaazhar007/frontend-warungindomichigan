'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartContext';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import Container from '@/components/Container/Container';
import styles from './CheckoutPage.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { getShippingRates, ShippingRate } from '@/services/shippingService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


// A list of all U.S. states for our dropdown
const usStates = [
  { name: 'Alabama', abbreviation: 'AL' }, { name: 'Alaska', abbreviation: 'AK' },
  { name: 'Arizona', abbreviation: 'AZ' }, { name: 'Arkansas', abbreviation: 'AR' },
  { name: 'California', abbreviation: 'CA' }, { name: 'Colorado', abbreviation: 'CO' },
  { name: 'Connecticut', abbreviation: 'CT' }, { name: 'Delaware', abbreviation: 'DE' },
  { name: 'Florida', abbreviation: 'FL' }, { name: 'Georgia', abbreviation: 'GA' },
  { name: 'Hawaii', abbreviation: 'HI' }, { name: 'Idaho', abbreviation: 'ID' },
  { name: 'Illinois', abbreviation: 'IL' }, { name: 'Indiana', abbreviation: 'IN' },
  { name: 'Iowa', abbreviation: 'IA' }, { name: 'Kansas', abbreviation: 'KS' },
  { name: 'Kentucky', abbreviation: 'KY' }, { name: 'Louisiana', abbreviation: 'LA' },
  { name: 'Maine', abbreviation: 'ME' }, { name: 'Maryland', abbreviation: 'MD' },
  { name: 'Massachusetts', abbreviation: 'MA' }, { name: 'Michigan', abbreviation: 'MI' },
  { name: 'Minnesota', abbreviation: 'MN' }, { name: 'Mississippi', abbreviation: 'MS' },
  { name: 'Missouri', abbreviation: 'MO' }, { name: 'Montana', abbreviation: 'MT' },
  { name: 'Nebraska', abbreviation: 'NE' }, { name: 'Nevada', abbreviation: 'NV' },
  { name: 'New Hampshire', abbreviation: 'NH' }, { name: 'New Jersey', abbreviation: 'NJ' },
  { name: 'New Mexico', abbreviation: 'NM' }, { name: 'New York', abbreviation: 'NY' },
  { name: 'North Carolina', abbreviation: 'NC' }, { name: 'North Dakota', abbreviation: 'ND' },
  { name: 'Ohio', abbreviation: 'OH' }, { name: 'Oklahoma', abbreviation: 'OK' },
  { name: 'Oregon', abbreviation: 'OR' }, { name: 'Pennsylvania', abbreviation: 'PA' },
  { name: 'Rhode Island', abbreviation: 'RI' }, { name: 'South Carolina', abbreviation: 'SC' },
  { name: 'South Dakota', abbreviation: 'SD' }, { name: 'Tennessee', abbreviation: 'TN' },
  { name: 'Texas', abbreviation: 'TX' }, { name: 'Utah', abbreviation: 'UT' },
  { name: 'Vermont', abbreviation: 'VT' }, { name: 'Virginia', abbreviation: 'VA' },
  { name: 'Washington', abbreviation: 'WA' }, { name: 'West Virginia', abbreviation: 'WV' },
  { name: 'Wisconsin', abbreviation: 'WI' }, { name: 'Wyoming', abbreviation: 'WY' }
];

// Define the shape of our form errors
interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
}

const CheckoutPage = () => {
  const { cartItems, cartTotal } = useCart();
  const { user } = useAuthStatus();

  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', address: '', apartment: '',
    city: '', state: 'ID', zipCode: '', country: 'US', phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [isAddressSubmitted, setIsAddressSubmitted] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('information');
  const [clicked, setClicked] = useState(true);
  // Load form data from localStorage on initial render
  useEffect(() => {
    const savedAddress = localStorage.getItem('shippingAddress');
    if (savedAddress) {
      setFormData(JSON.parse(savedAddress));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shippingAddress', JSON.stringify(formData));
  }, [formData]);

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || prev.email,
        firstName: user.displayName?.split(' ')[0] || prev.firstName,
        lastName: user.displayName?.split(' ').slice(1).join(' ') || prev.lastName,
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setClicked(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = 'Enter an email';
    if (!formData.firstName) newErrors.firstName = 'Enter a first name';
    if (!formData.lastName) newErrors.lastName = 'Enter a last name';
    if (!formData.address) newErrors.address = 'Enter an address';
    if (!formData.city) newErrors.city = 'Enter a city';
    if (!formData.zipCode) newErrors.zipCode = 'Enter a ZIP / postal code';
    if (!formData.phone) newErrors.phone = 'Enter a phone number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before continuing.");
      return;
    }

    setIsLoadingRates(true);
    setShippingRates([]);
    setSelectedRate(null);

    try {
      const addressData = {
        name: `${formData.firstName} ${formData.lastName}`,
        street1: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zipCode,
        country: formData.country,
      };
      const rates = await getShippingRates(addressData);
      setShippingRates(rates);
      setIsAddressSubmitted(true);
      setCheckoutStep('shipping'); // <-- Move to the next step
      toast.success("Shipping options loaded!");
      setClicked(false);
    } catch (error) {
      toast.error("Could not get shipping rates. Please check your address.");
    } finally {
      setIsLoadingRates(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCartMessage}>
        <h2>Your cart is empty</h2>
        <Link href="/products" className={styles.ctaButton}>Continue Shopping</Link>
      </div>
    )
  }

  const shippingCost = selectedRate ? parseFloat(selectedRate.amount) * 100 : 0;
  const finalTotal = cartTotal + shippingCost;

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.mainContent}>
        <Container>
          <h1 className={styles.logo}>WarungIndoMichigan.com</h1>
          <nav className={styles.breadcrumbs}>
            <Link href="/cart">Cart</Link> <FontAwesomeIcon icon={faChevronRight} />
            <span className={styles.active}>Shipping</span> <FontAwesomeIcon icon={faChevronRight} />
            <span>Payment</span>
          </nav>

          <div className={styles.contactLogin}>
            <h2 className={styles.sectionTitle}>Contact</h2>
            {!user && <Link href="/login" className={styles.loginLink}>Log in</Link>}
          </div>
          <div className={styles.inputGroup}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={`${styles.inputField} ${errors.email ? styles.errorInput : ''}`} />
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>

          <form onSubmit={handleContinueToShipping}>
            <h2 className={styles.formHeading}>Shipping address</h2>
            <div className={styles.inputGroup}>
              <select name="country" value={formData.country} onChange={handleChange} className={styles.inputField}><option value="US">United States</option></select>
            </div>
            <div className={styles.nameFields}>
              <div className={styles.inputGroup}>
                <input type="text" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} className={`${styles.inputField} ${errors.firstName ? styles.errorInput : ''}`} />
                {errors.firstName && <p className={styles.errorMessage}>{errors.firstName}</p>}
              </div>
              <div className={styles.inputGroup}>
                <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} className={`${styles.inputField} ${errors.lastName ? styles.errorInput : ''}`} />
                {errors.lastName && <p className={styles.errorMessage}>{errors.lastName}</p>}
              </div>
            </div>
            <div className={styles.inputGroup}>
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className={`${styles.inputField} ${errors.address ? styles.errorInput : ''}`} />
              {errors.address && <p className={styles.errorMessage}>{errors.address}</p>}
            </div>
            <div className={styles.inputGroup}>
              <input type="text" name="apartment" placeholder="Apartment, suite, etc. (optional)" value={formData.apartment} onChange={handleChange} className={styles.inputField} />
              {errors.address && <p className={styles.errorMessage}>{errors.address}</p>}
            </div>
            <div className={styles.addressFields}>
              <div className={styles.inputGroup}>
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className={`${styles.inputField} ${errors.city ? styles.errorInput : ''}`} />
                {errors.city && <p className={styles.errorMessage}>{errors.city}</p>}
              </div>
              <div className={styles.inputGroup}>
                <select name="state" value={formData.state} onChange={handleChange} className={styles.inputField} >
                  <option value="" disabled>State</option>
                  {usStates.map(state => (
                    <option key={state.abbreviation} value={state.abbreviation}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* <select name="state" value={formData.state} onChange={handleChange} className={styles.inputField}><option value="ID">Idaho</option></select> */}

              <div className={styles.inputGroup}>
                <input type="text" name="zipCode" placeholder="ZIP code" value={formData.zipCode} onChange={handleChange} className={`${styles.inputField} ${errors.zipCode ? styles.errorInput : ''}`} />
                {errors.zipCode && <p className={styles.errorMessage}>{errors.zipCode}</p>}
              </div>
            </div>
            <div className={styles.inputGroup}>
              <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className={`${styles.inputField} ${errors.phone ? styles.errorInput : ''}`} />
              {errors.phone && <p className={styles.errorMessage}>{errors.phone}</p>}
            </div>
            <div className={styles.formFooter}>
              <Link href="/cart" className={styles.returnLink}>&larr; Return to cart</Link>
              {/* { clicked ? (

              ) : (

              )} */}
              {clicked && (
                <button type="submit" className={styles.submitButton} disabled={isLoadingRates}>
                  {isLoadingRates ? 'Loading...' : 'Load Shipping'}
                </button>
              )}
            </div>
          </form>

          {/* --- Shipping Options (shown after address is submitted) --- */}
          {isAddressSubmitted && (
            <div className={styles.shippingSection}>
              <hr className={styles.sectionDivider} />
              <h2>Select Shipping Method</h2>
              {shippingRates.length > 0 ? shippingRates.map(rate => (
                <label key={rate.object_id} className={styles.rateLabel}>
                  <input type="radio" name="shippingRate" onChange={() => setSelectedRate(rate)} checked={selectedRate?.object_id === rate.object_id} />
                  <div className={styles.rateDetails}>
                    <span>{rate.provider} {rate.servicelevel.name}</span>
                    <small>{rate.duration_terms}</small>
                  </div>
                  <span className={styles.ratePrice}>${rate.amount}</span>
                </label>
              )) : <p>No shipping options available for this address.</p>}
            </div>
          )}
          {/* --- Payment Section (placeholder) --- */}
          {selectedRate && (
            <div className={styles.paymentSection}>
              <hr className={styles.sectionDivider} />
              <h2>Payment</h2>
              <p>All transactions are secure and encrypted.</p>
              {/* Stripe payment element will go here */}
              <div className={styles.paymentPlaceholder}>Stripe Payment Form</div>
              <button className={styles.submitButton}>Continue to payment</button>
            </div>
          )}
        </Container>
      </div>

      <div className={styles.summaryContainer}>
        {cartItems.map(item => (
          <div key={item.id} className={styles.summaryItem}>
            <div className={styles.summaryItemImage}>
              <Image src={item.imageUrl || '/placeholder.png'} alt={item.name} width={64} height={64} className={styles.summaryImage} />
              <span className={styles.summaryItemQuantity}>{item.quantity}</span>
            </div>
            <div className={styles.summaryItemDetails}>
              <h4 className={styles.itemName}>{item.name}</h4>
            </div>
            <div className={styles.summaryItemPrice}>
              ${((item.price * item.quantity) / 100).toFixed(2)}
            </div>
          </div>
        ))}
        <hr className={styles.divider} />
        <div className={styles.summaryRow}><span>Subtotal</span><span>${(cartTotal / 100).toFixed(2)}</span></div>
        <div className={styles.summaryRow}><span>Shipping</span><span>{selectedRate ? `$${selectedRate.amount}` : 'Calculated at next step'}</span></div>
        <hr className={styles.divider} />
        <div className={`${styles.summaryRow} ${styles.totalRow}`}><span>Total</span><span>${(finalTotal / 100).toFixed(2)}</span></div>
      </div>
    </div>
  );
};

export default CheckoutPage;
