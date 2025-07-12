'use client';

import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Container from '@/components/Container/Container';
import ProductCard from '@/components/ProductCard/ProductCard';
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './Products.module.scss';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
}

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
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setIsLoading(true);
    setProducts([]);
    setLastVisible(null);
    setHasMore(true);
    fetchMoreData(true);
  }, [debouncedSearchTerm]);

  const fetchMoreData = async (isInitialFetch = false) => {
    if (!isInitialFetch && !hasMore) return;

    try {
      const cursor = isInitialFetch ? null : lastVisible;
      const data = await fetchProductsFromAPI(cursor, debouncedSearchTerm);

      setProducts(prevProducts => [...prevProducts, ...data.products]);

      if (data.lastVisible) {
        setLastVisible(data.lastVisible);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSkeletons = (count: number) => {
    return Array.from({ length: count }).map((_, index) => <SkeletonCard key={index} />);
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

        {isLoading ? (
          <div className={styles.grid}>{renderSkeletons(8)}</div>
        ) : products.length === 0 ? (
          <div className={styles.notFound}>
            <h2>Product not found</h2>
            <p>Sorry, we couldn't find any products matching your search.</p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<div className={styles.grid} style={{ marginTop: '2rem' }}>{renderSkeletons(4)}</div>}
            endMessage={
              <p className={styles.endMessage}>
                <b>You've seen it all!</b>
              </p>
            }
            className={styles.grid}
          >
            {products.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
          </InfiniteScroll>
        )}
      </Container>
    </div>
  );
};

export default ProductsPage;
