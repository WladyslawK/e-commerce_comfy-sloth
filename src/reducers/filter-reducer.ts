import {SET_PRODUCTS} from "../utils/actions";
import {ProductsResponseType} from "../api/comfy-api";
import {setProductsAC} from "./products-reducer";

export type FilterStateType = {
  filtered_products: ProductsResponseType[],
  all_products: ProductsResponseType[],
  grid_view: boolean
  sort: string
  filter: {
    category: string
    text: string
    company: string
    color: string
    min_price: number
    max_price: number
    price: number
    shipping: boolean
  }
}

const initialState: FilterStateType = {
  filtered_products: [],
  all_products: [],
  grid_view: false,
  sort: "price-lowest",
  filter: {
    category: 'all',
    text: '',
    company: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  }
}


export const filterReducer = (state: FilterStateType = initialState, action: ActionsType) : FilterStateType => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, all_products: action.payload.products, filtered_products: action.payload.products}
    default:
      return state;
  }

}

type ActionsType = | ReturnType<typeof setProductsAC>
