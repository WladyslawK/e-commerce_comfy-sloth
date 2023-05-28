import React from 'react';
import {PageHero, ProductsList, Sort} from "../components";
import styled from "styled-components";

export const ProductsPage = () => {
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