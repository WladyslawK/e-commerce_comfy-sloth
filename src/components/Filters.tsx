import React, {ChangeEvent, MouseEvent} from 'react'
import styled from 'styled-components'
import {getUniqueValues, formatPrice} from '../utils/helpers'
import {FaCheck} from 'react-icons/fa'
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType, ThunkAppDispatchType} from "../store/store";
import {clearFiltersAC, filterProductsAC, FilterStateType, updateFiltersAC} from "../reducers/filter-reducer";

export function Filters() {
  const dispatch = useDispatch<ThunkAppDispatchType>()
  const {
    filter: {
      category,
      text,
      company,
      color,
      min_price,
      max_price,
      price,
      shipping,
    },
    all_products
  } = useSelector<rootReducerType, FilterStateType>(state => state.filter)

  console.log(max_price)

  const updateFiltersHandler =
    (e:ChangeEvent<HTMLInputElement>
      | MouseEvent<HTMLButtonElement>
      | ChangeEvent<HTMLSelectElement>
    ) => {

    const payload = {
      [e.currentTarget.name]: e.currentTarget.value
    }
    dispatch(updateFiltersAC(payload))
    dispatch(filterProductsAC())
  }

  const updateShippingHandler = (e: ChangeEvent ) => {
    dispatch(updateFiltersAC({shipping: !shipping}))
    dispatch(filterProductsAC())
  }

  const clearFiltersHandler =() => dispatch(clearFiltersAC())

  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors')

  return <Wrapper>
    <div className="content">
      <form onSubmit={(e) => e.preventDefault()} action=''>
        <div className="form-control">
          <input
            type="text"
            name='text'
            placeholder='search'
            className='search-input'
            value={text}
            onChange={(e) => updateFiltersHandler(e)}
          />
        </div>
        <div className='form-control'>
          <h5>category</h5>
          <div>
            {
              categories.map((item, index) => {
                return <button
                  type="button"
                  key={index}
                  name='category'
                  onClick={(e) => updateFiltersHandler(e)}
                  className={item === category ? 'active' : ''}
                  value={item}
                >
                  {item}
                </button>
              })
            }
          </div>
        </div>
        <div className="from-control">
          <h5>company</h5>
          <div className="form-control">
            <select name="company" value={company} onChange={(e) => updateFiltersHandler(e)} className='company'>
              {
                companies.map((item, index) => <option
                  key={index}
                  className={item === company ? 'active' : ''}
                >
                  {item}
                </option>)
              }
            </select>
          </div>

        </div>
        <div className="form-control">
          <h5>colors</h5>
          <div className="colors">
            {
              colors.map((item, index) => <button
                key={index}
                name='color'
                style={{backgroundColor: item}}
                className={color[0] === item ? 'active color-btn' : 'color-btn'}
                onClick={(e) => updateFiltersHandler(e)}
                data-color={item}
                value={item}
              >
                {color === item ? <FaCheck/> : null}
              </button>)
            }
          </div>
        </div>
        <div className="form-control">
          <h5>price</h5>
          <p className="price">{formatPrice(price)}</p>
          <input
            type="range"
            name='price'
            onChange={(e) => updateFiltersHandler(e)}
            min={min_price}
            max={max_price}
            value={price}
          />
        </div>
        <div className="form-control">
          <p className='shipping'>
            <span>Free shipping</span>
            <input type="checkbox" checked={shipping} name='shipping' onChange={(e) => updateShippingHandler(e)}/>
          </p>

        </div>
        <div className="form-control">
          <button type='button' className='clear-btn' onClick={clearFiltersHandler} >Clear filters</button>
        </div>
      </form>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;

    h5 {
      margin-bottom: 0.5rem;
    }
  }

  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }

  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }

  .active {
    border-color: var(--clr-grey-5);
  }

  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }

  .colors {
    display: flex;
    align-items: center;
  }

  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }

  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }

  .active {
    opacity: 1;
  }

  .all-btn .active {
    text-decoration: underline;
  }

  .price {
    margin-bottom: 0.25rem;
  }
  
  .shipping{
    display: flex;
    justify-content: space-between;
  }

  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }

  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }

  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`
