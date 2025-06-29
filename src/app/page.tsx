import Hero from '@/components/Hero/Hero';
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      {/* We will add the other homepage sections (Featured Products, etc.) here later */}
    </main>
  )
}