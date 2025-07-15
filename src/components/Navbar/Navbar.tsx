"use client"
import { useState } from 'react';
import Link from 'next/link';
import Container from '../Container/Container';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            WarungIndo
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.desktopNavLinks}>
            <Link href="/products">All Products</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className={styles.navActions}>
            <Link href="/cart" className={styles.actionButton}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartCount > 0 && (
                <span className={styles.cartCount}>{cartCount}</span>
              )}
            </Link>
            <Link href="/login" className={`${styles.actionButton} ${styles.desktopOnly}`}>
              <FontAwesomeIcon icon={faUser} />
            </Link>

            {/* Hamburger Menu Button */}
            <button className={styles.hamburgerButton} onClick={toggleMenu}>
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.isOpen : ''}`}>
        <Link href="/products" onClick={toggleMenu}>All Products</Link>
        <Link href="/about" onClick={toggleMenu}>About</Link>
        <Link href="/contact" onClick={toggleMenu}>Contact</Link>
        <Link href="/login" onClick={toggleMenu}>Login / Account</Link>
      </div>
    </nav>
  );
};

export default Navbar;