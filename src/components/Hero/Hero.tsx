import Link from 'next/link';
import Container from '../Container/Container';
import styles from './Hero.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Container>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Authentic Indonesian Flavors,
            <br />
            Delivered to Your Door.
          </h1>
          <p className={styles.subtitle}>
            Discover the rich taste of Indonesia, right here in Michigan. From classic snacks to essential spices.
          </p>
          <Link href="/products" className={styles.ctaButton}>
            <span>Shop All Products</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Hero;