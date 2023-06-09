import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import AmountButtons from "./AmountButtons";
import { ProductResponseType } from "../api/comfy-api";

type Props = {
  product: ProductResponseType;
};

const AddToCart = ({ product }: Props) => {
  const { id, stock, colors } = product;
  console.log("colors", colors);

  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const increase = () =>
    setAmount((prevState) => {
      if (prevState < stock) {
        return prevState + 1;
      }
      return prevState;
    });
  const decrease = () =>
    setAmount((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      }
      return prevState;
    });

  return (
    <Wrapper>
      <div className="colors">
        <span> colors : </span>
        <div>
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setMainColor(color)}
              className={mainColor === color ? "active color-btn" : "color-btn"}
              style={{ backgroundColor: color }}
            >
              {mainColor === color && <FaCheck />}
            </button>
          ))}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link to={"/cart"} className="btn">
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;

  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;

    span {
      text-transform: capitalize;
      font-weight: 700;
    }

    div {
      display: flex;
    }
  }

  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
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
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }

  .active {
    opacity: 1;
  }

  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
