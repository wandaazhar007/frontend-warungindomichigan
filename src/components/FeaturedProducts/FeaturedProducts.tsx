'use client'; // This component fetches data on the client side

import { useState, useEffect } from 'react';
import Container from '../Container/Container';
import ProductCard from '../ProductCard/ProductCard';
import styles from './FeaturedProducts.module.scss';

// Simplified Product type
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products from your backend API
        const res = await fetch('http://192.168.0.52:8080/api/products');
        const data = await res.json();
        // Take the first 4 products as featured items
        setProducts(data.data.products.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className={styles.featuredSection}>
      <Container>
        <h2 className={styles.title}>Featured Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className={styles.grid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedProducts;