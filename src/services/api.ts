import { Product } from '@/types/store';

const BASE_URL = 'https://fakestoreapi.com';

export const api = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  getProduct: async (id: number): Promise<Product> => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products by category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
};