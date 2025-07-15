'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import Container from '@/components/Container/Container';
import styles from './ProductPage.module.scss';

interface ProductClientProps {
  product: Product;
}

const ProductClient = ({ product }: ProductClientProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className={styles.productPage}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.imageGallery}>
            <Image
              src={product.imageUrl || '/placeholder.png'}
              alt={product.name}
              fill
              className={styles.mainImage}
              priority
            />
          </div>
          <div className={styles.productDetails}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.price}>${(product.price / 100).toFixed(2)}</p>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.stock}>
              {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
            </p>
            <div className={styles.actions}>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                min="1"
                max={product.stockQuantity}
                className={styles.quantityInput}
                aria-label="Quantity"
              />
              <button
                onClick={handleAddToCart}
                className={styles.addToCartButton}
                disabled={product.stockQuantity === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductClient;
