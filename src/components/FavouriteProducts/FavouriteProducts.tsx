'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Container from '../Container/Container';
import FavouriteCard from '../FavouriteCard/FavouriteCard';
import styles from './FavouriteProducts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Simplified Product type
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
}

const FavouriteProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null); // Ref for the sliding track

  // State to control the visibility of scroll buttons
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://192.168.0.52:8080/api/products');
        const data = await res.json();
        setProducts(data.data.products);
      } catch (error) {
        console.error("Failed to fetch favourite products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Function to check scroll position and update button visibility
  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < (scrollWidth - clientWidth) - 1);
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
    }
    return () => {
      if (track) {
        track.removeEventListener('scroll', checkScroll);
      }
    };
  }, [products]);


  // Scroll handler for the buttons
  const handleScroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = trackRef.current.clientWidth * 0.8; // Scroll by 80% of the visible width
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={styles.favouriteSection}>
      <Container>
        <header className={styles.header}>
          <h2 className={styles.title}>Favourite</h2>
          <div className={styles.controls}>
            {/* Previous Button */}
            <button onClick={() => handleScroll('left')} className={styles.scrollButton} disabled={!canScrollLeft}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {/* Next Button */}
            <button onClick={() => handleScroll('right')} className={styles.scrollButton} disabled={!canScrollRight}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <Link href="/products" className={styles.viewAllButton}>
              Lihat Semua
            </Link>
          </div>
        </header>
      </Container>

      <div className={styles.carouselContainer}>
        {loading ? (
          <p>Loading favourites...</p>
        ) : (
          <div className={styles.carouselTrack} ref={trackRef}>
            {products.map((product) => (
              <FavouriteCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FavouriteProducts;
