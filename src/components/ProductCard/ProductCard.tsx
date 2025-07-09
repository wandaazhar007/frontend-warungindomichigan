import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';

// Simplified Product type
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Format price to Indonesian Rupiah style, e.g., "Rp. 18.000"
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price / 100); // Assuming price is in cents

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <button className={styles.iconButton}>
          <FontAwesomeIcon icon={faStar} />
        </button>
        <button className={styles.iconButton}>
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
      <Link href={`/products/${product.id}`} className={styles.imageContainer}>
        <Image
          src={product.imageUrl || '/placeholder.png'}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Link>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className={styles.price}>{formattedPrice.replace('Rp', 'Rp.')}</p>
        <p className={styles.category}>{product.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;