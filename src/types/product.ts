// This interface defines the full shape of a Product object
// that we get from our backend API.
export interface Product {
  id: string;
  name: string;
  slug?: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stockQuantity: number;
  dimensions?: {
    size?: string;
    weight?: number;
    height?: number;
    width?: number;
    length?: number;
  };
  createdAt: string | { _seconds: number; _nanoseconds: number; };
  updatedAt: string | { _seconds: number; _nanoseconds: number; };
}

// This interface can be used for forms where some fields might not be required initially.
// For now, it's identical but could be customized later.
export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  imageUrl?: string;
}
