import axios from 'axios';

const PRODUCTS_API_URL = 'https://dummyjson.com/products';
const LOGIN_API_URL = 'https://dummyjson.com/auth/login';

export const getProducts = async () => {
  try {
    const response = await axios.get(PRODUCTS_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(LOGIN_API_URL, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error during login', error);
    throw error;
  }
};
