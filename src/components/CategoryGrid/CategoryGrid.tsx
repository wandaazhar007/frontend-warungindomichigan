import Link from 'next/link';
import Container from '../Container/Container';
import styles from './CategoryGrid.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWineGlassAlt,
  faPizzaSlice,
  faMugHot,
  faCoffee,
  faLeaf,
  faFire
} from '@fortawesome/free-solid-svg-icons';

// Data for our categories
const categories = [
  { name: 'Minuman', icon: faWineGlassAlt, href: '/products?category=Beverages' },
  { name: 'Makanan', icon: faPizzaSlice, href: '/products?category=Foods' },
  { name: 'Boba', icon: faMugHot, href: '/products?category=Beverages' },
  { name: 'Coffee', icon: faCoffee, href: '/products?category=Beverages' },
  { name: 'Dessert', icon: faLeaf, href: '/products?category=Others' },
  { name: 'Appetizer', icon: faFire, href: '/products?category=Foods' },
];

const CategoryGrid = () => {
  return (
    <section className={styles.categorySection}>
      <Container>
        {/* <h2 className={styles.title}>Category Products</h2> */}
        <div className={styles.grid}>
          {categories.map((category) => (
            <Link href={category.href} key={category.name} className={styles.categoryCard}>
              <FontAwesomeIcon icon={category.icon} className={styles.icon} />
              <span className={styles.name}>{category.name}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoryGrid;