import {
  FILTER_PRODUCTS,
  SET_GRID_VIEW,
  SET_LIST_VIEW,
  SET_PRODUCTS,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  UPDATE_SORT
} from "../utils/actions";
import {ProductsResponseType} from "../api/comfy-api";
import {setProductsAC} from "./products-reducer";

export type SortType = "price-lowest" | "price-highest" | "name-a" | "name-z"

export type FilterStateType = {
  filtered_products: ProductsResponseType[],
  all_products: ProductsResponseType[],
  grid_view: boolean
  sort: SortType
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

export const initialState: FilterStateType = {
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
    max_price: 10000,
    price: 0,
    shipping: false,
  }
}

export const setListViewAC = () => ({type: SET_LIST_VIEW} as const)
export const setGridViewAC = () => ({type: SET_GRID_VIEW} as const)
export const updateSortAC = (sort: SortType) => ({type: UPDATE_SORT, payload: {sort}} as const)
export const sortProductsAC = () => ({type: SORT_PRODUCTS,} as const)
export const updateFiltersAC = (payload: Partial<FilterStateType['filter']>) => ({
  type: UPDATE_FILTERS,
  payload
} as const)
export const filterProductsAC = () => ({type: FILTER_PRODUCTS} as const)

export const filterReducer = (state: FilterStateType = initialState, action: ActionsType): FilterStateType => {
  switch (action.type) {
    case SET_PRODUCTS:{
      const  maxPrice = Math.max(...action.payload.products.map(product => product.price))
      const  minPrice = Math.min(...action.payload.products.map(product => product.price))
      return {...state, all_products: action.payload.products, filtered_products: action.payload.products, filter: {...state.filter, max_price: maxPrice, min_price: minPrice, price: maxPrice}}
    }

    case SET_LIST_VIEW:
      return {...state, grid_view: false}
    case SET_GRID_VIEW:
      return {...state, grid_view: true}
    case UPDATE_SORT:
      return {...state, sort: action.payload.sort}
    case SORT_PRODUCTS: {
      const {filtered_products, sort} = state
      let temp_products = []
      switch (sort) {
        case "price-highest": {
          temp_products = filtered_products.sort((a, b) => b.price - a.price)
          break;
        }
        case "price-lowest": {
          temp_products = filtered_products.sort((a, b) => a.price - b.price)
          break;
        }
        case "name-a": {
          temp_products = filtered_products.sort((a, b) => a.name.localeCompare(b.name))
          break;
        }
        case "name-z": {
          temp_products = filtered_products.sort((a, b) => b.name.localeCompare(a.name))
          break;
        }
      }
      return {...state, filtered_products: temp_products}
    }
    case UPDATE_FILTERS:
      return {...state, filter: {...state.filter, ...action.payload }}

    case FILTER_PRODUCTS: {
      let filtered_products = [...state.all_products]
      const { category, text, company, color, price, shipping } = state.filter

      if(!(category === 'all')){
        filtered_products = filtered_products.filter(product => product.category === category)
      }

      if(!(text === '')){
        filtered_products = filtered_products.filter(product => product.name.toLowerCase().includes(text.toLowerCase()))
      }

      if(!(company === 'all')){
        filtered_products = filtered_products.filter(product => product.company === company)
      }

      if(!(color === 'all')){
        filtered_products = filtered_products.filter(product => {
          for(let i = 0; i < product.colors.length; i++ ){
            if(product.colors[i] === color) return true
          }
          return false
        })
      }

      if(price){
        filtered_products = filtered_products.filter(product => product.price <= price)
      }

      if(shipping){
        filtered_products = filtered_products.filter(product => product.shipping)
      }

      if(!(company === 'all')){
        filtered_products = filtered_products.filter(product => product.company === company)
      }


      return {...state, filtered_products: filtered_products}
    }
    default:
      return state;
  }
}


type ActionsType =
  | ReturnType<typeof setProductsAC>
  | ReturnType<typeof setListViewAC>
  | ReturnType<typeof setGridViewAC>
  | ReturnType<typeof updateSortAC>
  | ReturnType<typeof sortProductsAC>
  | ReturnType<typeof updateFiltersAC>
  | ReturnType<typeof filterProductsAC>
