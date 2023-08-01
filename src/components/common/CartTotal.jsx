import styled from "styled-components";
import React from "react";

import { MButton } from "./Buttons";
import minusIcn from "../../assets/icons/minus.svg";
import plusIcn from "../../assets/icons/plus.svg";

const CartTotal = () => {
  return (
    <>
      <StyledCartTotal>
        <ul className="cartTotalBox">
          <li className="amount">
            <p tabindex="0">총 상품금액</p>
            <p tabindex="0">45,000원</p>
          </li>
          <li>
            <img src={minusIcn} alt="plus" />
          </li>
          <li className="amount">
            <p tabindex="0">상품 할인</p>
            <p tabindex="0">0원</p>
          </li>
          <li>
            <img src={plusIcn} alt="plus" />
          </li>
          <li className="amount">
            <p tabindex="0">배송비</p>
            <p tabindex="0">3,500원</p>
          </li>
          <li></li>
          <li className="total amount">
            <p tabindex="0">결제 예정 금액</p>
            <p tabindex="0">48,500원</p>
          </li>
        </ul>
        <MButton>주문하기</MButton>
      </StyledCartTotal>
    </>
  );
};

const StyledCartTotal = styled.section`
  margin-top: 20px;
  text-align: center;

  .cartTotalBox {
    width: min(1280px, 100%);
    height: 150px;
    margin-bottom: 10px;
    background-color: var(--gray-100);
    display: flex;
    justify-content: space-around;
    align-items: center;
    li {
      display: inherit;
      font-size: 16px;
    }
  }

  .amount {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    p:nth-of-type(2) {
      font-weight: 700;
      font-size: 20px;
    }
  }

  .total {
    p:nth-of-type(2) {
      color: #ff5e00;
      font-size: 24px;
    }
  }
  & > button {
    margin-top: 20px;
    width: 15%;
  }
`;

export default CartTotal;
