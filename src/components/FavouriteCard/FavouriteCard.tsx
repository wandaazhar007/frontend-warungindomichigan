import Link from 'next/link';
import Image from 'next/image';
import styles from './FavouriteCard.module.scss';

// A simplified Product type for the card
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
}

interface FavouriteCardProps {
  product: Product;
}

const FavouriteCard = ({ product }: FavouriteCardProps) => {
  return (
    <div className={styles.card}>
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
        <p className={styles.price}>{(product.price / 100).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace('IDR', '').trim()}</p>
        <p className={styles.category}>{product.category}</p>
      </div>
    </div>
  );
};

export default FavouriteCard;