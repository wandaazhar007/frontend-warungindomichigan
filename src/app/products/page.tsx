'use client';

import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Container from '@/components/Container/Container';
import ProductCard from '@/components/ProductCard/ProductCard';
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard';
import { useDebounce } from '@/hooks/useDebounce';
import { getCategories, Category } from '@/services/categoryService';
import { getProducts } from '@/services/productService';
import { Product } from '@/types/product';
import styles from './Products.module.scss';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    getCategories().then(setCategories).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setProducts([]);
    setLastVisible(null);
    setHasMore(true);
    fetchMoreData(true);
  }, [debouncedSearchTerm, selectedCategory]);

  const fetchMoreData = async (isInitialFetch = false) => {
    if (!isInitialFetch && !hasMore) return;

    try {
      const cursor = isInitialFetch ? null : lastVisible;
      const data = await getProducts(cursor, debouncedSearchTerm, selectedCategory);
      if (data && Array.isArray(data.products)) {
        setProducts(prev => (isInitialFetch ? data.products : [...prev, ...data.products]));
        setLastVisible(data.lastVisible);
        setHasMore(!!data.lastVisible);
      } else {
        // If the data is not what we expect, log an error and stop fetching.
        console.error("API response is missing or has a malformed 'products' array.");
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };


  const handleCategoryClick = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
  };

  const renderSkeletons = (count: number) => Array.from({ length: count }).map((_, index) => <SkeletonCard key={index} />);

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

        {/* --- CATEGORY FILTER BAR --- */}
        <div className={styles.categoryFilter}>
          <button
            onClick={() => handleCategoryClick(null)}
            className={!selectedCategory ? styles.active : ''}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className={selectedCategory === cat.name ? styles.active : ''}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className={styles.grid}>{renderSkeletons(8)}</div>
        ) : (
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<div className={styles.grid} style={{ marginTop: '2rem' }}>{renderSkeletons(4)}</div>}
            endMessage={<p className={styles.endMessage}><b>You've seen it all!</b></p>}
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
