// Defines the shape of the shipping address object,
// which will be part of the customer's profile.
export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// This is the main interface for a Customer object
export interface Customer {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  creationTime?: string;
  lastSignInTime?: string;
  disabled?: boolean;
  shippingAddress?: ShippingAddress;
}
