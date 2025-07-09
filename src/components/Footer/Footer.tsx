import Container from '../Container/Container';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        {/* <p>&copy; {new Date().getFullYear()} WarungIndoMichigan. All rights reserved.</p> */}
        <p>Built with ❤️ by Wanda Azhar in Twin Falls, ID. USA</p>
      </Container>
    </footer>
  );
};

export default Footer;