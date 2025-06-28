import Link from 'next/link';
import Container from '../Container/Container';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            WarungIndo
          </Link>
          <div className={styles.navLinks}>
            <Link href="/products">All Products</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className={styles.navActions}>
            <Link href="/cart" className={styles.actionButton}>
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className={styles.cartCount}>0</span>
            </Link>
            <Link href="/login" className={styles.actionButton}>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;