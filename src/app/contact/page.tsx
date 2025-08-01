'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Container from '@/components/Container/Container';
import styles from './Contact.module.scss'; // <-- Import the SCSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '@/lib/config';

// Define the shape of our form errors
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for the field when user starts typing
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  // --- NEW VALIDATION FUNCTION ---
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setIsLoading(true);
    try {
      // const response = await axios.post('http://192.168.0.52:8080/api/contact', formData);
      // const response = await axios.post(`${process.env.NEXT_PUBLIC_CONTACT_API_URL}`, formData);
      // toast.success(response.data.message);
      const response = await axios.post(`${API_BASE_URL}/contact`, formData);
      toast.success(response.data.message);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const address = '3710 Green Brier Blvd Apt 370C, Ann Arbor, MI 48105';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className={styles.contactPage}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.formSection}>
            <h2>Get In Touch</h2>
            <p>Have a question or a special request? Fill out the form and we'll get back to you!</p>
            {/* <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="phone">Phone Number (Optional)</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form> */}

            <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? styles.errorInput : ''} />
                {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? styles.errorInput : ''} />
                {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="phone">Phone Number (Optional)</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} className={errors.message ? styles.errorInput : ''}></textarea>
                {errors.message && <p className={styles.errorMessage}>{errors.message}</p>}
              </div>
              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          <div className={styles.infoSection}>
            <h3>Contact Information</h3>
            <div className={styles.infoItem}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
              <div>
                <h4>Address</h4>
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">{address}</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <FontAwesomeIcon icon={faPhone} className={styles.icon} />
              <div>
                <h4>Phone</h4>
                <a href="tel:6464671926">(646) 467-1926</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
              <div>
                <h4>Email</h4>
                <a href="mailto:warungindomichigan@gmail.com">warungindomichigan@gmail.com</a>
              </div>
            </div>
            <div className={styles.mapContainer}>
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${encodeURIComponent(address)}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
