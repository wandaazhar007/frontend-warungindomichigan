'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import Container from '@/components/Container/Container';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
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

  // --- NEW: Handlers for the quantity selector ---
  const handleIncrease = () => {
    // Prevent increasing quantity beyond available stock
    if (quantity < product.stockQuantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrease = () => {
    // Prevent decreasing quantity below 1
    setQuantity(prev => Math.max(1, prev - 1));
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
              <QuantitySelector
                quantity={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
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
