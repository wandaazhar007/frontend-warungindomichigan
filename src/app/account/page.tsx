'use client';

import { useState, useEffect } from 'react';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { useRouter } from 'next/navigation';
import { getMyOrders } from '@/services/orderService';
import type { Order } from '@/types/order';
import Container from '@/components/Container/Container';
import styles from './AccountPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AccountPage = () => {
  const { user, isLoading: isAuthLoading } = useAuthStatus();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    // If auth check is done and there's no user, redirect to login
    if (!isAuthLoading && !user) {
      router.push('/login?redirect=/account');
    }

    // If there is a user, fetch their orders
    if (user) {
      const fetchOrders = async () => {
        try {
          const data = await getMyOrders();
          setOrders(data.orders);
        } catch (error) {
          console.error("Could not fetch order history", error);
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [user, isAuthLoading, router]);

  if (isAuthLoading || !user) {
    return (
      <div className={styles.loader}>
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  return (
    <div className={styles.accountPage}>
      <Container>
        <h1>My Account</h1>
        <p>Welcome back, {user.displayName || user.email}!</p>

        <div className={styles.historySection}>
          <h2>Your Order History</h2>
          {loadingOrders ? (
            <p>Loading your orders...</p>
          ) : orders.length === 0 ? (
            <p>You haven't placed any orders yet.</p>
          ) : (
            <div className={styles.ordersList}>
              {orders.map(order => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <span>Order ID: {order.id.substring(0, 8)}...</span>
                    <span>{new Date((order.createdAt as any)._seconds * 1000).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.orderBody}>
                    <p><strong>Status:</strong> {order.orderStatus}</p>
                    <p><strong>Total:</strong> ${(order.totalAmount / 100).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AccountPage;
