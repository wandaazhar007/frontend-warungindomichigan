'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../Container/Container';
import styles from './CategoryGrid.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,     // Icon for Foods
  faWineGlassAlt, // Icon for Beverages
  faFire,         // Icon for Seasonings
  faSmoking,      // Icon for Cigarettes
  faBriefcaseMedical, // Icon for Medicine
  faTag           // A default icon
} from '@fortawesome/free-solid-svg-icons';
import { getCategories, Category } from '@/services/categoryService';

// --- THIS IS OUR NEW ICON MAP ---
// It maps lowercase category names to the icons we imported.
const iconMap: { [key: string]: typeof faTag } = {
  foods: faUtensils,
  beverages: faWineGlassAlt,
  seasonings: faFire,
  cigaretes: faSmoking,
  medicine: faBriefcaseMedical,
  // You can add more mappings here as you create new categories
};


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
            {categories.map((category) => {
              // --- THIS IS THE NEW LOGIC ---
              // 1. Look up the icon in our iconMap using the category name.
              // 2. Convert to lowercase to ensure a match (e.g., "Foods" -> "foods").
              // 3. If no specific icon is found, use the default faTag icon.
              const icon = iconMap[category.name.toLowerCase()] || faTag;

              return (
                <Link href={`/products?category=${category.name}`} key={category.id} className={styles.categoryCard}>
                  {/* 2. Use the found icon here */}
                  <FontAwesomeIcon icon={icon} className={styles.icon} />
                  <span className={styles.name}>{category.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};

export default CategoryGrid;
