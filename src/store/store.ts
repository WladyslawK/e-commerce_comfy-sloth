import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux'
import {productReducer} from "../reducers/product-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
  products: productReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type rootReducerType = ReturnType<typeof rootReducer>

export type ThunkAppDispatchType = ThunkDispatch<rootReducerType, any, AnyAction>