import Container from '../Container/Container';
import styles from './PromoBannerOne.module.scss';

const PromoBannerOne = () => {
  return (
    <section className={styles.promoBanner}>
      <Container>
        <div className={styles.content}>
          <h4 className={styles.tagline}>Wide Selection of Authentic Indonesian Groceries</h4>
          <h2 className={styles.headline}>Your Destination For Indonesian Flavors</h2>
          <p className={styles.description}>
            Explore our expertly curated selection, designed to bring the taste of Indonesia to your home.
            Here, quality meets convenience, offering you the finest range of snacks, spices, and ingredients.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default PromoBannerOne;
