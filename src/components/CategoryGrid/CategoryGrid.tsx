'use client'; // This component now fetches data, so it must be a client component.

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../Container/Container';
import styles from './CategoryGrid.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { getCategories, Category } from '@/services/categoryService'; // Import the service

const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error in component:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className={styles.categorySection}>
      <Container>
        <h2 className={styles.title}>Category Products</h2>
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <div className={styles.grid}>
            {categories.map((category) => (
              // The link will now point to a filtered product page
              <Link href={`/products?category=${category.name}`} key={category.id} className={styles.categoryCard}>
                <FontAwesomeIcon icon={faTag} className={styles.icon} />
                <span className={styles.name}>{category.name}</span>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default CategoryGrid;
