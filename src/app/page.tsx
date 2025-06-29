import Hero from '@/components/Hero/Hero';
import styles from './page.module.scss'
import FeaturedProducts from '@/components/FeaturedProducts/FeaturedProducts';

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <FeaturedProducts />
    </main>
  )
}