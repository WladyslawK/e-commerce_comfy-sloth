import React, {useEffect} from 'react';
import {PageHero, ProductsList, Sort} from "../components";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType, ThunkAppDispatchType} from "../store/store";
import {FilterStateType} from "../reducers/filter-reducer";
import {getProductsTC} from "../reducers/products-reducer";

export const ProductsPage = () => {

  const {filtered_products: products, } = useSelector<rootReducerType, FilterStateType>(state => state.filter)

  const dispatch = useDispatch<ThunkAppDispatchType>()

  useEffect(() => {
    if(!products.length){
      dispatch(getProductsTC())
    }
  }, [])

  return (<main>
      <PageHero title={'products'}/>
      <Wrapper>
        <div className='section-center products'>
          <div>
            <Sort/>
            <ProductsList/>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};


const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`