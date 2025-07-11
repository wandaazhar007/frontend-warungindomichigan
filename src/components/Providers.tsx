'use client';

import { Toaster } from 'react-hot-toast';

// This is a client component that wraps our app and includes client-side providers
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#28a745',
              color: 'white',
              fontSize: '1.6rem',
              padding: '1.2rem'
            },
          },
          error: {
            style: {
              background: '#dc3545',
              color: 'white',
              fontSize: '1.6rem',
              padding: '1.2rem'
            },
          },
        }}
      />
      {children}
    </>
  );
}