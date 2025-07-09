import Image from 'next/image';
import Container from '@/components/Container/Container';
import styles from './About.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - WarungIndoMichigan',
};

// Placeholder data for team members
const teamMembers = [
  { name: 'Wanda Azhar', role: 'Founder & CEO', image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { name: 'Jane Doe', role: 'Operations Manager', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { name: 'John Smith', role: 'Customer Support', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroImageContainer}>
          <Image
            src="https://images.pexels.com/photos/4253303/pexels-photo-4253303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Founder of WarungIndoMichigan"
            fill
            priority
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroOverlay} />
        <Container>
          <div className={styles.heroContent}>
            <h1>About Us</h1>
          </div>
        </Container>
      </div>

      {/* Main Content Section */}
      <Container>
        <div className={styles.mainContent}>
          <div className={styles.storySection}>
            <h2>Our Story</h2>
            <p>
              WarungIndoMichigan was born from a simple idea: to bring the authentic, vibrant flavors of Indonesia to the heart of Michigan. As an Indonesian living abroad, our founder, Wanda Azhar, missed the familiar tastes of home—the comforting aroma of rendang, the satisfying crunch of krupuk, and the unique sweetness of kecap manis.
            </p>
            <p>
              What started as a personal quest to find these beloved ingredients soon grew into a passion for sharing them with the wider community. We realized many others were also searching for a connection to their heritage through food. And so, WarungIndoMichigan was established, not just as a store, but as a bridge connecting cultures, one delicious product at a time.
            </p>
          </div>
          <div className={styles.missionSection}>
            <h2>Our Mission</h2>
            <p>
              Our mission is to make authentic Indonesian groceries accessible to everyone. We are committed to sourcing the highest-quality products, from essential spices and sauces to nostalgic snacks and drinks. We believe that food is a powerful way to preserve tradition and create new memories, and we are dedicated to providing the ingredients that help you do just that in your own kitchen.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className={styles.teamSection}>
          <h2>Meet The Team</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <div key={member.name} className={styles.teamMember}>
                <div className={styles.memberImage}>
                  <Image src={member.image} alt={member.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
