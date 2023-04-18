import axios from "axios";
import {BASE_URL, PRODUCTS_URL, SINGLE_PRODUCT_URL} from "../utils/constants";

const instance = axios.create({
  baseURL: BASE_URL
})

export const comfyAPI = {
  getProducts () {
    return instance.get<ProductResponseType[]>(PRODUCTS_URL)
  },
  getProduct(id: string){
    return instance.get(SINGLE_PRODUCT_URL + id)
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