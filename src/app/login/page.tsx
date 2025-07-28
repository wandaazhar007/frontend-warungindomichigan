// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useRouter, usePathname } from 'next/navigation';
// // import Link from 'next/link';
// // import toast from 'react-hot-toast';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
// // import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// // import Container from '@/components/Container/Container';
// // import styles from './AuthPage.module.scss';
// // import { signInWithEmail, signInWithGoogle } from '@/services/authService';
// // import { useAuthStatus } from '@/hooks/useAuthStatus';

// // // Define the shape of our form errors
// // interface FormErrors {
// //   email?: string;
// //   password?: string;
// // }

// // const LoginPage = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [errors, setErrors] = useState<FormErrors>({});
// //   const router = useRouter();
// //   const { user, isLoading: isAuthLoading } = useAuthStatus();
// //   const pathname = usePathname();// <-- Get the current URL path


// //   const loginHref = `/login?redirect=${pathname}`;


// //   // This effect will run when the auth state is determined.
// //   useEffect(() => {
// //     // If the check is complete AND we have a logged-in user, redirect them.
// //     if (!isAuthLoading && user) {
// //       router.push('/');
// //     }
// //   }, [user, isAuthLoading, router]);

// //   const validate = () => {
// //     const newErrors: FormErrors = {};
// //     if (!email) newErrors.email = 'Email is required.';
// //     if (!password) newErrors.password = 'Password is required.';

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };


// //   const handleEmailLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!validate()) return;
// //     setIsLoading(true);
// //     try {
// //       await signInWithEmail(email, password);
// //       toast.success('Logged in successfully!');
// //       // router.push('/');
// //       router.push(loginHref); // Redirect to the page they were trying to access
// //     } catch (error: any) {
// //       console.error("Login failed:", error);
// //       toast.error(error.message || "Failed to sign in.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleGoogleSignIn = async () => {
// //     try {
// //       await signInWithGoogle();
// //       toast.success('Signed in with Google!');
// //       router.push("/cart"); // Redirect to the page they were trying to access
// //     } catch (error) {
// //       toast.error("Failed to sign in with Google.");
// //     }
// //   };

// //   return (
// //     <div className={styles.authPage}>
// //       <Container>
// //         <div className={styles.formContainer}>
// //           <h1>Welcome Back!</h1>
// //           <p className={styles.subtitle}>Please enter your details to sign in.</p>

// //           <div className={styles.socialButtons}>
// //             <button onClick={handleGoogleSignIn} className={styles.socialButton}>
// //               <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
// //             </button>
// //             <button className={styles.socialButton}>
// //               <FontAwesomeIcon icon={faApple} /> Sign in with Apple
// //             </button>
// //           </div>

// //           <div className={styles.divider}><span>OR</span></div>

// //           <form onSubmit={handleEmailLogin}>
// //             <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={errors.email ? styles.errorInput : ''} />
// //             {errors.email && <p className={styles.errorMessageLogin}>{errors.email}</p>}
// //             <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={errors.password ? styles.errorInput : ''} />
// //             {errors.email && <p className={styles.errorMessageLogin}>{errors.password}</p>}
// //             <button type="submit" className={styles.submitButton} disabled={isLoading}>
// //               {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Sign In'}
// //             </button>
// //           </form>

// //           <p className={styles.footerText}>
// //             Don't have an account? <Link href="/signup">Sign up</Link>
// //           </p>
// //         </div>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default LoginPage;


// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import toast from 'react-hot-toast';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import Container from '@/components/Container/Container';
// import styles from './AuthPage.module.scss';
// import { signInWithEmail, signInWithGoogle } from '@/services/authService';
// import { useAuthStatus } from '@/hooks/useAuthStatus';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { user, isLoading: isAuthLoading } = useAuthStatus();

//   // Get the redirect path from the URL, or default to the homepage '/'
//   const redirect = searchParams.get('redirect') || '/';

//   // This hook correctly handles redirecting users who are ALREADY logged in.
//   useEffect(() => {
//     if (!isAuthLoading && user) {
//       router.push(redirect);
//     }
//   }, [user, isAuthLoading, router, redirect]);

//   const handleEmailLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       await signInWithEmail(email, password);
//       toast.success('Logged in successfully!');
//       // The useEffect hook will handle the redirect after the user state updates.
//     } catch (error: any) {
//       toast.error(error.message || "Failed to sign in.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- THIS IS THE KEY FIX ---
//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithGoogle();
//       toast.success('Signed in with Google!');
//       // After a successful Google sign-in, the 'user' state will update,
//       // and the useEffect hook above will now correctly handle the redirect.
//     } catch (error) {
//       toast.error("Failed to sign in with Google.");
//     }
//   };

//   if (isAuthLoading || user) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//         <FontAwesomeIcon icon={faSpinner} spin size="3x" />
//       </div>
//     );
//   }

//   return (
//     <div className={styles.authPage}>
//       <Container>
//         <div className={styles.formContainer}>
//           <h1>Welcome Back!</h1>
//           <p className={styles.subtitle}>Please enter your details to sign in.</p>

//           <div className={styles.socialButtons}>
//             <button onClick={handleGoogleSignIn} className={styles.socialButton}>
//               <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
//             </button>
//             <button className={styles.socialButton}>
//               <FontAwesomeIcon icon={faApple} /> Sign in with Apple
//             </button>
//           </div>

//           <div className={styles.divider}><span>OR</span></div>

//           <form onSubmit={handleEmailLogin}>
//             <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <button type="submit" className={styles.submitButton} disabled={isLoading}>
//               {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Sign In'}
//             </button>
//           </form>

//           <p className={styles.footerText}>
//             Don't have an account? <Link href="/signup">Sign up</Link>
//           </p>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default LoginPage;



'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Container from '@/components/Container/Container';
import styles from './AuthPage.module.scss';
import { signInWithEmail, signInWithGoogle } from '@/services/authService';
import { useAuthStatus } from '@/hooks/useAuthStatus';

// Define the shape of our form errors
interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: isAuthLoading } = useAuthStatus();

  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (!isAuthLoading && user) {
      router.push(redirect);
    }
  }, [user, isAuthLoading, router, redirect]);

  // --- NEW VALIDATION FUNCTION ---
  const validate = () => {
    const newErrors: FormErrors = {};
    if (!email) newErrors.email = 'Enter an email';
    if (!password) newErrors.password = 'Enter a password';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call the validate function before submitting
    if (!validate()) return;

    setIsLoading(true);
    try {
      await signInWithEmail(email, password);
      toast.success('Logged in successfully!');
      // The useEffect will handle the redirect
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        toast.error("Invalid email or password.");
      } else {
        toast.error("Failed to sign in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Signed in with Google!');
    } catch (error) {
      toast.error("Failed to sign in with Google.");
    }
  };

  if (isAuthLoading || user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  return (
    <div className={styles.authPage}>
      <Container>
        <div className={styles.formContainer}>
          <h1>Welcome Back!</h1>
          <p className={styles.subtitle}>Please enter your details to sign in.</p>

          <div className={styles.socialButtons}>
            <button onClick={handleGoogleSignIn} className={styles.socialButton}>
              <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
            </button>
            <button className={styles.socialButton}>
              <FontAwesomeIcon icon={faApple} /> Sign in with Apple
            </button>
          </div>

          <div className={styles.divider}><span>OR</span></div>

          <form onSubmit={handleEmailLogin}>
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={errors.email ? styles.errorInput : ''} />
              {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
            </div>
            <div className={styles.inputGroup}>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={errors.password ? styles.errorInput : ''} />
              {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
            </div>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Sign In'}
            </button>
          </form>

          <p className={styles.footerText}>
            Don't have an account? <Link href={`/signup?redirect=${redirect}`}>Sign up</Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
