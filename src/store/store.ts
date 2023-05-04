import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  legacy_createStore,
} from "redux";
import { productsReducer } from "../reducers/products-reducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { productReducer } from "../reducers/product-reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type rootReducerType = ReturnType<typeof rootReducer>;

export type ThunkAppDispatchType = ThunkDispatch<
  rootReducerType,
  any,
  AnyAction
>;
