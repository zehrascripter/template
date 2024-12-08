// pages/products/[id].tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import React from 'react';
import { products } from '../../utils/products'; // Adjust the path as per your project structure

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

const ProductPage = ({ product }: ProductProps) => {
  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={800}
            className="w-full h-auto object-cover rounded shadow-lg"
          />
        </div>
        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-6">£{product.price}</p>
          <p className="text-gray-600">
            {/* Sample Description */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. Nulla rhoncus feugiat eros quis consectetur.
          </p>
          {/* Add more product details as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

// Fetch all possible paths
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false, // Set to 'blocking' or true if you want to generate pages on the fly
  };
};

// Fetch data for each product
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const product = products.find((p) => p.id === parseInt(id as string));

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};
