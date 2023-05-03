import axios from "axios";
import { BASE_URL, PRODUCTS_URL, SINGLE_PRODUCT_URL } from "../utils/constants";

const instance = axios.create({
  baseURL: BASE_URL,
});

export const comfyAPI = {
  getProducts() {
    return instance.get<ProductsResponseType[]>(PRODUCTS_URL);
  },
  getProduct(id: string) {
    return instance.get<ProductResponseType>(SINGLE_PRODUCT_URL + id);
  },
};

export type ProductsResponseType = {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
  company: string;
  description: string;
  category: string;
  shipping: boolean;
};

export type ProductResponseType = {
  id: string;
  stock: number;
  price: number;
  shipping: true;
  colors: string[];
  category: string;
  images: ImageType[];
  reviews: number;
  stars: number;
  name: string;
  description: string;
  company: string;
};

type ImageType = {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: {
      url: string;
      width: number;
      height: number;
    };
    large: {
      url: string;
      width: number;
      height: number;
    };
    full: {
      url: string;
      width: number;
      height: number;
    };
  };
};
