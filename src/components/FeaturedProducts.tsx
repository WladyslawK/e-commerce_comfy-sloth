import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType, ThunkAppDispatchType} from "../store/store";
import {getProductsTC, productsStateType} from "../reducers/products-reducer";
import Product from './Product'

const FeaturedProducts = () => {

  const {
    products_loading: loading,
    products_error: error,
    feature_products: featured
  } = useSelector<rootReducerType, productsStateType>(state => state.products)

  const dispatch = useDispatch<ThunkAppDispatchType>()

  useEffect(() => {
    dispatch(getProductsTC())
  }, [])

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return <Error/>
  }

  return <Wrapper>
    <div className="title">
      <h2>featured products</h2>
      <div className="underline"></div>
      <div className="section-center featured">
        {
          featured.slice(0, 3).map(product => <Product key={product.id} {...product} />)
        }
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  
  .title{
    padding: 5rem 0;
  }

  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;

    img {
      height: 225px;
    }
  }

  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }

  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts
