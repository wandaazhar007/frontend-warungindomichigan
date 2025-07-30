'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Container from '@/components/Container/Container';
import styles from '../login/AuthPage.module.scss';
import { signUpWithEmail, signInWithGoogle } from '@/services/authService';

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();


  const validate = () => {
    const newErrors: FormErrors = {};
    if (!fullName) newErrors.fullName = 'Full Name is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    // --- NEW VALIDATION LOGIC ---
    if (!confirmPassword) newErrors.confirmPassword = 'Please re-enter your password.';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await signUpWithEmail(fullName, email, password);
      toast.success('Account created successfully!');
      router.push('/'); // Redirect to homepage on success
    } catch (error: any) {
      console.error("Signup failed:", error);
      // Check for the specific Firebase error code
      if (error.code === 'auth/email-already-in-use') {
        toast.error("This email is already registered. Please try logging in, possibly with Google or Apple.");
      } else {
        toast.error(error.message || "Failed to create an account.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Signed in with Google!');
      router.push('/'); // Redirect to homepage on success
    } catch (error) {
      toast.error("Failed to sign in with Google.");
    }
  };

  return (
    <div className={styles.authPage}>
      <Container>
        <div className={styles.formContainer}>
          <h1>Create an Account</h1>
          <p className={styles.subtitle}>Join us to get the best Indonesian products.</p>

          <div className={styles.socialButtons}>
            <button onClick={handleGoogleSignIn} className={styles.socialButton}>
              <FontAwesomeIcon icon={faGoogle} /> Sign up with Google
            </button>
            {/* <button className={styles.socialButton}>
              <FontAwesomeIcon icon={faApple} /> Sign up with Apple
            </button> */}
          </div>

          <div className={styles.divider}><span>OR</span></div>

          <form onSubmit={handleEmailSignup}>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={errors.fullName ? styles.errorInput : ''} />
              {errors.fullName && <p className={styles.errorMessage}>{errors.fullName}</p>}
            </div>
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={errors.email ? styles.errorInput : ''} />
              {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
            </div>
            {/* <div className={styles.inputGroup}>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={errors.password ? styles.errorInput : ''} />
              {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
            </div> */}

            <div className={`${styles.inputGroup} ${styles.passwordWrapper}`}>
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={errors.password ? styles.errorInput : ''} />
              <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
              {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
            </div>
            <div className={`${styles.inputGroup} ${styles.passwordWrapper}`}>
              <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={errors.confirmPassword ? styles.errorInput : ''} />
              <button type="button" className={styles.passwordToggle} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </button>
              {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword}</p>}
            </div>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Create Account'}
            </button>
          </form>

          <p className={styles.footerText}>
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default SignupPage;
