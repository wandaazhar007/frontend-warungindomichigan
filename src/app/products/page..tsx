'use client';

import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Container from '@/components/Container/Container';
import ProductCard from '@/components/ProductCard/ProductCard';
// import { useDebounce } from '@/hooks/useDebounce';
import { useDebounce } from '@/hooks/useDebounce'; // Ensure this hook is implemented in your project
import styles from './Products.module.scss';

// Simplified Product type for the page
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
}

// This is a placeholder for your actual API service
// We will replace this with a call to your backend
const fetchProductsFromAPI = async (lastVisible: string | null, searchTerm: string): Promise<{ products: Product[], lastVisible: string | null }> => {
  const params = new URLSearchParams();
  if (lastVisible) params.append('lastVisible', lastVisible);
  if (searchTerm) params.append('searchTerm', searchTerm);

  const res = await fetch(`http://192.168.0.52:8080/api/products?${params.toString()}`);
  const data = await res.json();
  return data.data;
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Effect to handle searching
  useEffect(() => {
    // When search term changes, reset everything and fetch new results
    setProducts([]);
    setLastVisible(null);
    setHasMore(true);
    fetchMoreData(true);
  }, [debouncedSearchTerm]);

  const fetchMoreData = async (isInitialFetch = false) => {
    if (!isInitialFetch && !hasMore) return;

    try {
      const data = await fetchProductsFromAPI(lastVisible, debouncedSearchTerm);

      setProducts(prevProducts => [...prevProducts, ...data.products]);

      if (data.lastVisible) {
        setLastVisible(data.lastVisible);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setHasMore(false);
    }
  };

  return (
    <div className={styles.productsPage}>
      <Container>
        <header className={styles.header}>
          <h1>All Products</h1>
          <div className={styles.searchContainer}>
            <input
              type="text"
              aria-label="Search products"
              placeholder="Search for products..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 style={{ textAlign: 'center', margin: '2rem 0' }}>Loading more products...</h4>}
          endMessage={
            <p style={{ textAlign: 'center', margin: '2rem 0' }}>
              <b>You have seen it all!</b>
            </p>
          }
          className={styles.grid}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export default ProductsPage;
