import Container from '@/components/Container/Container';
import styles from './Privacy.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - WarungIndoMichigan',
};

const PrivacyPage = () => {
  return (
    <div className={styles.privacyPage}>
      <Container>
        <article className={styles.content}>
          <h1>Privacy Policy</h1>
          <p className={styles.intro}>
            Your privacy is important to us. This Privacy Policy explains how WarungIndoMichigan collects, uses, discloses, and safeguards your information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
            </li>
            <li>
              <strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, or exchange. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor (e.g., Stripe), and you are encouraged to review their privacy policy and contact them directly for responses to your questions.
            </li>
          </ul>

          <h2>Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Process your orders and manage payments and refunds.</li>
            <li>Email you regarding your account or order.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
            <li>Notify you of updates to our products and services.</li>
          </ul>

          <h2>Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: contact@warungindomichigan.com
          </p>
        </article>
      </Container>
    </div>
  );
};

export default PrivacyPage;
