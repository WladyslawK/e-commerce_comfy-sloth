import React from 'react';
import {useSelector} from "react-redux";
import {FilterStateType} from "../reducers/filter-reducer";
import {rootReducerType} from "../store/store";
import {GridView} from "./GridView";
import {ListView} from "./ListView";

export function ProductsList() {

  const {filtered_products: products, grid_view} = useSelector<rootReducerType, FilterStateType>(state => state.filter)

  if(!products.length){
    return <h5 style={{textTransform: 'none'}}>
      Sorry no products match your search...
    </h5>
  }

  return (
    <div>
      {
        grid_view ?
        <GridView products={products}/> :
        <ListView products={products}/>
      }

    </div>
  );
};