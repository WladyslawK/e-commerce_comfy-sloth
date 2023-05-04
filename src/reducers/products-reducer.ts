import { comfyAPI, ProductsResponseType } from "../api/comfy-api";
import {
  PRODUCTS_ERROR,
  PRODUCTS_LOADING,
  SET_PRODUCTS,
} from "../utils/actions";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

export type productsStateType = {
  products_loading: boolean;
  products_error: boolean;
  products: ProductsResponseType[];
  feature_products: ProductsResponseType[];
};

export const productsInitialState: productsStateType = {
  products_loading: false,
  products_error: false,
  products: [],
  feature_products: [],
};

export const productsReducer = (
  state = productsInitialState,
  action: ActionsType
): productsStateType => {
  switch (action.type) {
    case PRODUCTS_LOADING:
      return { ...state, products_loading: true };

    case SET_PRODUCTS: {
      const featuredProducts = action.payload.products.filter(
        (product) => product.shipping === true
      );
      return {
        ...state,
        products: action.payload.products,
        products_loading: false,
        feature_products: featuredProducts,
      };
    }

    case PRODUCTS_ERROR:
      return { ...state, products_error: true };
  }

  return state;
};

type ActionsType =
  | ReturnType<typeof setProductsAC>
  | ReturnType<typeof setProductsError>
  | ReturnType<typeof setProductsLoading>;

export const getProductsTC = () => async (dispatch: Dispatch) => {
  dispatch(setProductsLoading());
  try {
    const data = await comfyAPI.getProducts();
    if (data.data) {
      dispatch(setProductsAC(data.data));
    }
  } catch (error: any) {
    console.log(error);
  }
};

export const setProductsAC = (products: ProductsResponseType[]) =>
  ({ type: SET_PRODUCTS, payload: { products } } as const);

export const setProductsError = () => ({ type: PRODUCTS_ERROR } as const);

export const setProductsLoading = () => ({ type: PRODUCTS_LOADING } as const);
