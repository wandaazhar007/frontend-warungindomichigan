import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.scss';

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
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price / 100);

  return (
    <div className={styles.card}>
      {/* The header with the icons has been removed */}
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