import ProductClient from './ProductClient';
import type { Metadata } from 'next';
import { Product } from '@/types/product';
import { API_BASE_URL } from '@/lib/config';

export const dynamic = 'force-dynamic';

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Data fetching error in getProduct:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.name} - WarungIndoMichigan`,
    description: product.description,
  };
}

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem', fontSize: '1.6rem' }}>
        <h2>404 - Not Found</h2>
        <p>Sorry, the product you are looking for does not exist.</p>
      </div>
    );
  }

  return <ProductClient product={product} />;
};

export default ProductPage;
