import Image from 'next/image';
import styles from './PromoImagesOne.module.scss';
import Container from '../Container/Container';

const PromoImagesOne = () => {
  return (
    <section className={styles.promoSection}>
      <Container>
        <div className={styles.gridContainer}>
          {/* Main large image (Left) */}
          <div className={`${styles.gridItem} ${styles.largeItem}`}>
            <Image
              src="https://images.pexels.com/photos/9313271/pexels-photo-9313271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Main Promotional Image"
              fill
              className={styles.promoImage}
            />
          </div>

          {/* Top-right image with text overlay */}
          <div className={`${styles.gridItem} ${styles.smallItemTop}`}>
            <Image
              src="https://images.pexels.com/photos/9313264/pexels-photo-9313264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Sour Flavor"
              fill
              className={styles.promoImage}
            />
            <h3 className={styles.promoText}>Sour</h3>
          </div>

          {/* Bottom-right image with text overlay */}
          <div className={`${styles.gridItem} ${styles.smallItemBottom}`}>
            <Image
              src="https://images.pexels.com/photos/7992742/pexels-photo-7992742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Creamy Flavor"
              fill
              className={styles.promoImage}
            />
            <h3 className={styles.promoText}>Creamy</h3>
          </div>

          {/* Full-width bottom banner image */}
          <div className={`${styles.gridItem} ${styles.bannerItem}`}>
            <Image
              src="https://images.pexels.com/photos/7992734/pexels-photo-7992734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Fasta Burst Banner"
              fill
              className={styles.promoImage}
            />
            <h3 className={`${styles.promoText} ${styles.bannerText}`}>FASTA BURRST</h3>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PromoImagesOne;