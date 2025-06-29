import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

// We'll create a simplified Product type for the card for now
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
  return (
    <div className={styles.card}>
      <Link href={`/products/${product.id}`} className={styles.imageContainer}>
        <Image
          src={product.imageUrl || '/placeholder.png'} // A fallback placeholder image
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Link>
      <div className={styles.cardContent}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <div className={styles.footer}>
          <p className={styles.price}>${(product.price / 100).toFixed(2)}</p>
          <button className={styles.addToCartBtn}>
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;