import Container from '../Container/Container';
import styles from './WhyChooseUs.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faSeedling,
  faHandshake,
  faCoins
} from '@fortawesome/free-solid-svg-icons';

// Updated data using FontAwesome icons
const features = [
  {
    icon: faRocket,
    title: 'Fast Delivery',
    description: 'Get your favorite Indonesian groceries delivered right to your door. No need to go back and forth looking for them.'
  },
  {
    icon: faSeedling,
    title: 'Authentic Selection',
    description: 'With years of experience, we know how to source the most authentic and high-quality Indonesian products for you.'
  },
  {
    icon: faHandshake,
    title: 'Transparent Pricing',
    description: 'We are always transparent about our costs. All prices are clear, straightforward, and competitive.'
  },
  {
    icon: faCoins,
    title: 'Great Value',
    description: 'With our great selection and prices, you save more. No need to travel far to find the products you love.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className={styles.whyChooseUsSection}>
      <Container>
        <div className={styles.header}>
          <h2>Why Choose WarungIndoMichigan?</h2>
          <p>
            We've proudly served hundreds of customers in the community. With our experience and passion for authentic flavors,
            we make it easy and fast for you to get your favorite Indonesian groceries.
          </p>
        </div>
        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                {/* Render the FontAwesomeIcon component */}
                <FontAwesomeIcon icon={feature.icon} className={styles.icon} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
