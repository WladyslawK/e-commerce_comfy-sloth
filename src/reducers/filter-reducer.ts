import {SET_GRID_VIEW, SET_LIST_VIEW, SET_PRODUCTS, SORT_PRODUCTS, UPDATE_SORT} from "../utils/actions";
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

export const setListViewAC = () => ({type: SET_LIST_VIEW} as const)
export const setGridViewAC = () => ({type: SET_GRID_VIEW} as const)
export const updateSortAC = (sort: SortType) => ({type: UPDATE_SORT, payload: {sort}} as const)
export const sortProductsAC = () => ({type: SORT_PRODUCTS, } as const)

export const filterReducer = (state: FilterStateType = initialState, action: ActionsType) : FilterStateType => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, all_products: action.payload.products, filtered_products: action.payload.products}
    case SET_LIST_VIEW:
      return {...state, grid_view: false}
    case SET_GRID_VIEW:
      return {...state, grid_view: true}
    case UPDATE_SORT:
      return {...state, sort: action.payload.sort}
    case SORT_PRODUCTS:{
      const {filtered_products, sort} = state
      let temp_products = []
      switch(sort){
        case "price-highest": {
          temp_products = filtered_products.sort((a, b) => b.price - a.price)
          break;
        }
        case "price-lowest":{
          temp_products = filtered_products.sort((a, b) => a.price - b.price)
          break;
        }
        case "name-a":{
          temp_products = filtered_products.sort((a, b) => a.name.localeCompare(b.name))
          break;
        }
        case "name-z":{
          temp_products = filtered_products.sort((a, b) => b.name.localeCompare(a.name))
          break;
        }
      }
      return {...state, filtered_products: temp_products}
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
