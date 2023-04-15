import axios from "axios";
import {BASE_URL, PRODUCTS_URL} from "../utils/constants";

const instance = axios.create({
  baseURL: BASE_URL
})

export const comfyAPI = {
  getProducts () {
    return instance.get<ProductResponseType[]>(PRODUCTS_URL)
  }
}

export type ProductResponseType = {
  id: string
  name: string
  price: number
  image: string
  colors: string[]
  company: string
  description: string
  category: string
  shipping: boolean
}