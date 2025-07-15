import ProductClient from './ProductClient';
import type { Metadata } from 'next';
import { Product } from '@/types/product';
import { API_BASE_URL } from '@/lib/config';

// This line explicitly tells Next.js to render this page dynamically on each request.
export const dynamic = 'force-dynamic';

// We define the data fetching function directly in the page file.
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

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// This function now uses the local getProduct function
// export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
//   const product = await getProduct(params.slug);
//   if (!product) {
//     return { title: 'Product Not Found' };
//   }
//   return {
//     title: `${product.name} - WarungIndoMichigan`,
//     description: product.description,
//   };
// }

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

// The page component also uses the local getProduct function
// const ProductPage = async ({ params }: ProductPageProps) => {
//   const product = await getProduct(params.slug);

//   if (!product) {
//     return (
//       <div style={{ textAlign: 'center', padding: '10rem', fontSize: '1.6rem' }}>
//         <h2>404 - Not Found</h2>
//         <p>Sorry, the product you are looking for does not exist.</p>
//       </div>
//     );
//   }

//   // Pass the fetched data to the interactive Client Component
//   return <ProductClient product={product} />;
// };

// export default ProductPage;

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
