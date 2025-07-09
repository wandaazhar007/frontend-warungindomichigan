import Link from 'next/link';
import Image from 'next/image';
import Container from '../Container/Container';
import styles from './FooterTwo.module.scss'; // <-- Import the SCSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const FooterTwo = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        {/* Top section with info blocks and social links */}
        <div className={styles.topFooter}>
          <div className={styles.infoBlock}>
            <FontAwesomeIcon icon={faUsers} className={styles.infoIcon} />
            <div className={styles.infoText}>
              <h4>Our Commitment to Community</h4>
              <Link href="/about">Learn more about WarungIndoMichigan</Link>
            </div>
          </div>
          <div className={styles.infoBlock}>
            <FontAwesomeIcon icon={faShieldAlt} className={styles.infoIcon} />
            <div className={styles.infoText}>
              <h4>Data Privacy</h4>
              <Link href="/privacy">Your privacy choices</Link>
            </div>
          </div>
          <div className={styles.socialBlock}>
            {/* Placeholder App Store links */}
            <div className={styles.appStores}>
              <Link href="#"><Image src="/app-store.svg" alt="App Store" width={120} height={40} /></Link>
              <Link href="#"><Image src="/google-play.svg" alt="Google Play" width={135} height={40} /></Link>
            </div>
            <div className={styles.socialIcons}>
              <Link href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></Link>
              <Link href="#" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></Link>
              <Link href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></Link>
              <Link href="#" aria-label="YouTube"><FontAwesomeIcon icon={faYoutube} /></Link>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className={styles.divider} />

        {/* Middle section with navigation links */}
        <nav className={styles.links}>
          <Link href="/terms">Legal terms & conditions</Link>
          <Link href="/privacy">Privacy center</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact us</Link>
        </nav>

        {/* Bottom section with legal text */}
        <div className={styles.legal}>
          <p>© {new Date().getFullYear()} WarungIndoMichigan. All rights reserved.</p>
          <p>
            The use of any other trade name, copyright, or trademark is for identification and reference purposes only
            and does not imply any association with the trademark holder of their product or brand.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default FooterTwo;
