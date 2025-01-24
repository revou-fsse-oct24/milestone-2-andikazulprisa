// import axios from "axios";

// export const getProducts = async () => {
//   try {
//     const response = await axios.get("https://api.escuelajs.co/api/v1/products");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// };

// export const getDetailProduct = async (id, callback) => {
//   try {
//     const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// };

// export default axios

import axios from "axios";

// Define the Product interface based on the API response structure
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category?: {
    id: number;
    name: string;
    image: string;
  };
}

// Function to fetch all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>("https://api.escuelajs.co/api/v1/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Function to fetch a product by ID
export const getDetailProduct = async (
  id: number,
  callback?: (data: Product | null) => void
): Promise<Product | null> => {
  try {
    const response = await axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
    const product = response.data;

    if (callback) {
      callback(product);
    }

    return product;
  } catch (error) {
    console.error("Error fetching product details:", error);

    if (callback) {
      callback(null);
    }

    return null;
  }
};

export default axios;
