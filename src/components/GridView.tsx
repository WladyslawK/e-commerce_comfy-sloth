import React from 'react';
import {ProductsResponseType} from "../api/comfy-api";
import {Product} from "./index";
import styled from "styled-components";

type Props = {
  products: ProductsResponseType[]
}

export function GridView({products}: Props) {
  return (
    <Wrapper>
      <div className="products-container">
        {
          products.map(({name, price, image, id}) => <Product key={id} name={name} price={price} image={image} id={id}/>)
        }
      </div>
    </Wrapper>

  );
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`
