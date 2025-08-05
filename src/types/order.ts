// Defines the shape of a single item within an order
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

// Defines the shape of the shipping address
export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Defines the shape of the customer's details attached to an order
export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  shippingAddress?: ShippingAddress;
}

// This is the main interface for a complete Order object from our backend
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  customerDetails: CustomerDetails;
  subtotal: number;
  shippingCost?: number;
  totalAmount: number;
  paymentMethod?: string;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Unpaid' | 'Paid' | 'Failed';
  // Handle both Firestore timestamp and regular Date objects
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  } | Date;
}
