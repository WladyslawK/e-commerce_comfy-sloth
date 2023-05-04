import { ProductResponseType, comfyAPI } from "../api/comfy-api";
import { SET_PRODUCT, SET_PRODUCT_LOADING } from "../utils/actions";
import { Dispatch } from "redux";

export type ProductStateType = {
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: ProductResponseType;
};

const productInitialState: ProductStateType = {
  single_product_loading: false,
  single_product_error: false,
  single_product: {} as ProductResponseType,
};

export const productReducer = (
  state = productInitialState,
  action: ActionTypes
): ProductStateType => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        single_product: action.payload.product,
        single_product_loading: false,
      };
    case SET_PRODUCT_LOADING:
      return { ...state, single_product_loading: true };
    default:
      return state;
  }
};

type ActionTypes =
  | ReturnType<typeof setProductAC>
  | ReturnType<typeof setProductLoadingAC>;

export const setProductAC = (product: ProductResponseType) =>
  ({ type: SET_PRODUCT, payload: { product } } as const);

export const setProductLoadingAC = () =>
  ({ type: SET_PRODUCT_LOADING } as const);

export const fetchProductTC = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setProductLoadingAC());
  try {
    const product = await comfyAPI.getProduct(id);
    if (product.data) {
      console.log(product);
      dispatch(setProductAC(product.data));
    }
  } catch (error: any) {
    console.log(error);
  }
};
