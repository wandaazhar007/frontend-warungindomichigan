// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation'; // <-- Import usePathname
// import { useCart } from '@/context/CartContext';
// import { useAuthStatus } from '@/hooks/useAuthStatus';
// import { logOut } from '@/services/authService';
// import toast from 'react-hot-toast';
// import Container from '../Container/Container';
// import styles from './Navbar.module.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faShoppingCart,
//   faUser,
//   faBars,
//   faTimes,
//   faRightFromBracket
// } from '@fortawesome/free-solid-svg-icons';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { cartCount } = useCart();
//   const { user } = useAuthStatus();
//   const router = useRouter();
//   const pathname = usePathname(); // <-- Get the current URL path

//   // --- THIS IS THE KEY CHANGE ---
//   // Create the redirect URL for the login link
//   const loginHref = `/login?redirect=${pathname}`;
//   const signupHref = `/signup?redirect=${pathname}`;

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLogout = async () => {
//     try {
//       await logOut();
//       toast.success('Logged out successfully!');
//       if (isMenuOpen) toggleMenu();
//       router.push('/');
//     } catch (error) {
//       console.error("Logout failed:", error);
//       toast.error("Failed to log out.");
//     }
//   };

//   return (
//     <nav className={styles.navbar}>
//       <Container>
//         <div className={styles.navContent}>
//           <Link href="/" className={styles.logo}>
//             WarungIndo
//           </Link>

//           <div className={styles.desktopNavLinks}>
//             <Link href="/products">All Products</Link>
//             <Link href="/about">About</Link>
//             <Link href="/contact">Contact</Link>
//           </div>

//           <div className={styles.navActions}>
//             <Link href="/cart" className={styles.actionButton}>
//               <FontAwesomeIcon icon={faShoppingCart} />
//               {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
//             </Link>

//             {user ? (
//               <>
//                 <span className={`${styles.userName} ${styles.desktopOnly}`}>{user.displayName || 'Account'}</span>
//                 <button onClick={handleLogout} className={`${styles.actionButton} ${styles.desktopOnly}`} title="Logout">
//                   <FontAwesomeIcon icon={faRightFromBracket} />
//                 </button>
//               </>
//             ) : (
//               // Use the new href for the login link
//               <Link href={loginHref} className={`${styles.actionButton} ${styles.desktopOnly}`} title="Login">
//                 <FontAwesomeIcon icon={faUser} />
//               </Link>
//             )}

//             <button className={styles.hamburgerButton} onClick={toggleMenu}>
//               <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
//             </button>
//           </div>
//         </div>
//       </Container>

//       {/* <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.isOpen : ''}`}>
//         <Link href="/products" onClick={toggleMenu}>All Products</Link>
//         <Link href="/about" onClick={toggleMenu}>About</Link>
//         <Link href="/contact" onClick={toggleMenu}>Contact</Link>

//         {user ? (
//           <button onClick={handleLogout} className={styles.mobileLogoutButton}>Log Out</button>
//         ) : (
//           // Use the new href for the mobile login link
//           <Link href={loginHref} onClick={toggleMenu}>Login / Sign Up</Link>
//         )}
//       </div> */}

//       <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.isOpen : ''}`}>
//         <Link href="/products" onClick={toggleMenu}>All Products</Link>
//         <Link href="/about" onClick={toggleMenu}>About</Link>
//         <Link href="/contact" onClick={toggleMenu}>Contact</Link>

//         {user ? (
//           <button onClick={handleLogout} className={styles.mobileLogoutButton}>Log Out</button>
//         ) : (
//           <div className={styles.mobileAuthLinks}>
//             <Link href={loginHref} onClick={toggleMenu}>Login</Link>
//             <span>/</span>
//             <Link href={signupHref} onClick={toggleMenu}>Sign Up</Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { logOut } from '@/services/authService';
import toast from 'react-hot-toast';
import Container from '../Container/Container';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faUser,
  faBars,
  faTimes,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user } = useAuthStatus();
  const router = useRouter();
  const pathname = usePathname();

  // --- THIS IS THE FIX ---
  // Create dynamic redirect URLs for both login and signup
  const loginHref = `/login?redirect=${pathname}`;
  const signupHref = `/signup?redirect=${pathname}`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully!');
      if (isMenuOpen) toggleMenu();
      router.push('/');
    } catch (error) {
      toast.error("Failed to log out.");
    }
  };

  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            WarungIndo
          </Link>

          <div className={styles.desktopNavLinks}>
            <Link href="/products">All Products</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className={styles.navActions}>
            <Link href="/cart" className={styles.actionButton}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
            </Link>

            {user ? (
              <>
                <span className={`${styles.userName} ${styles.desktopOnly}`}>{user.displayName || 'Account'}</span>
                <button onClick={handleLogout} className={`${styles.actionButton} ${styles.desktopOnly}`} title="Logout">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              </>
            ) : (
              <Link href={loginHref} className={`${styles.actionButton} ${styles.desktopOnly}`} title="Login">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}

            <button className={styles.hamburgerButton} onClick={toggleMenu}>
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>
      </Container>

      {/* --- CORRECTED MOBILE MENU --- */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.isOpen : ''}`}>
        <Link href="/products" onClick={toggleMenu}>All Products</Link>
        <Link href="/about" onClick={toggleMenu}>About</Link>
        <Link href="/contact" onClick={toggleMenu}>Contact</Link>

        {user ? (
          <button onClick={handleLogout} className={styles.mobileLogoutButton}>Log Out</button>
        ) : (
          <div className={styles.mobileAuthLinks}>
            <Link href={loginHref} onClick={toggleMenu}>Login</Link>
            <span>/</span>
            <Link href={signupHref} onClick={toggleMenu}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
