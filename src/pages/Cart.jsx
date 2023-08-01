import styled from "styled-components";
import { useEffect, useState } from "react";

// import BuyerTopNav from "../components/common/BuyerTopNav";
import CartTotal from "../components/common/CartTotal";
import { StyledQuantity } from "../components/common/Quantity";
import rabbitImg from "../assets/images/rabbit.png";

const Cart = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const url = "https://openmarket.weniv.co.kr";
      const path = `/cart/`;
      const token = localStorage.getItem("token");
      const res = await fetch(url + path, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const json = await res.json();
      setData(json.results);
      const quantityList = {};
      json.results.map((v) => {
        quantityList[v.cart_item_id] = v.quantity;
      });
      setQuantity(quantityList);
    })();
  }, []);

  const token = localStorage.getItem("token");
  const handleDeleteBtn = async (e) => {
    e.preventDefault();
    const url = "https://openmarket.weniv.co.kr";
    const cartItemId = e.target.parentNode.dataset.id;
    const path = `/cart/${cartItemId}/`;
    const res = await fetch(url + path, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    // const json = await res.json();
    // console.log(json);
  };

  const [quantity, setQuantity] = useState({});

  const changeQuantity = async (productId, cartItemId, quantity) => {
    const url = "https://openmarket.weniv.co.kr";
    const path = `/cart/${cartItemId}/`;
    const quantityData = {
      product_id: productId,
      quantity: quantity,
      is_active: false, // 임시. 장바구니 내 상품 활성화 버튼, 같이 보내지 않으면 False
    };
    console.log(JSON.stringify(quantityData));
    const res = await fetch(url + path, {
      method: "PUT",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(quantityData),
    });
    const json = await res.json();
    console.log(json);
  };

  return (
    <>
      {/* <BuyerTopNav></BuyerTopNav> */}
      <StyledMain>
        <h2 tabindex="0">장바구니</h2>
        <ul className="head">
          <li>
            <input tabindex="0" type="checkbox" />
          </li>
          <li tabindex="0">상품 정보</li>
          <li tabindex="0" className="temptemp">
            수량
          </li>
          <li tabindex="0">상품금액</li>
        </ul>
        <ul className="body">
          {data &&
            data.map((v) => {
              return (
                <li key={v.cart_item_id} data-id={v.cart_item_id}>
                  <input type="checkbox" />
                  <span className="productInfo">
                    <img src={rabbitImg} alt="담요를 덮은 토끼" />
                    <div>
                      <span tabindex="0">백엔드글로벌</span>
                      <h3 tabindex="0">딥러닝 개발자 무릎 담요</h3>
                      <span tabindex="0">15,000원</span>
                      <span tabindex="0">택배배송 / 무료배송</span>
                    </div>
                  </span>
                  <StyledQuantity>
                    <label htmlFor="quantity-inp" className="a11y-hidden">
                      수량 입력
                    </label>
                    <input
                      id="quantity-inp"
                      type="number"
                      value={quantity[v.cart_item_id]}
                      min={1}
                      onChange={(e) => {
                        const quantityList = { ...quantity };
                        quantityList[v.cart_item_id] = e.target.value;
                        setQuantity(quantityList);
                        changeQuantity(
                          v.product_id,
                          v.cart_item_id,
                          e.target.value
                        );
                      }}
                    />
                    <button
                      className="minus-btn"
                      aria-label="수량 빼기"
                      onClick={() => {
                        const quantityList = { ...quantity };
                        quantityList[v.cart_item_id]--;
                        setQuantity(quantityList);
                        changeQuantity(
                          v.product_id,
                          v.cart_item_id,
                          quantityList[v.cart_item_id]
                        );
                      }}
                    ></button>
                    <button
                      className="plus-btn"
                      aria-label="수량 더하기"
                      onClick={(e) => {
                        const quantityList = { ...quantity };
                        quantityList[v.cart_item_id]++;
                        setQuantity(quantityList);
                        changeQuantity(
                          v.product_id,
                          v.cart_item_id,
                          quantityList[v.cart_item_id]
                        );
                      }}
                    ></button>
                  </StyledQuantity>
                  <span tabindex="0" className="productPrice">
                    45,000원
                  </span>
                  <button
                    className="delete-btn"
                    onClick={handleDeleteBtn}
                  ></button>
                </li>
              );
            })}
        </ul>

        <CartTotal></CartTotal>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  width: min(1280px, 100%);
  box-sizing: border-box;
  padding: 90px 52px 0;
  margin: auto;

  h2 {
    font-size: 3.6rem;
    line-height: 4.4rem;
    font-weight: 700;
    text-align: center;
  }
  ul.head {
    display: flex;
    justify-content: space-between;
    margin: 52px 0 35px;
    background: var(--gray-100);
    font-size: 1.8rem;
    padding: 20px 110px 20px 30px;
    border-radius: 10px;
  }
  ul.body {
    li {
      display: flex;
      align-items: center; //미세 조정 필
      justify-content: space-between; //임시
      padding: 20px 100px 20px 30px;
      border-radius: 10px;
      border: 1px solid var(--gray-300);
      position: relative;

      .delete-btn {
        position: absolute;
        right: 4%;
        top: 20%;
      }

      .delete-btn::before {
        content: "";
        position: absolute;
        height: 2px;
        width: 20px;
        transform: rotate(45deg);
        background: var(--gray-300);
      }
      .delete-btn::after {
        content: "";
        position: absolute;
        height: 2px;
        width: 20px;
        transform: rotate(-45deg);
        background: var(--gray-300);
      }

      .productInfo {
        display: flex;
        gap: 20px;
        img {
          height: 150px;
          width: 150px;
          margin-left: -50px;
        }
        & > div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 10px 0;
          span {
            font-size: 14px;
            color: var(--gray-400);
          }
          h3 {
            font-size: 18px;
          }
          span:nth-of-type(3) {
            margin-top: 20px;
          }

          span:nth-of-type(2) {
            font-weight: 700;
            color: black;
            font-size: 16px;
          }
        }
      }
      .productPrice {
        font-size: 20px;
        font-weight: 700;
        color: #eb5757;
      }
    }
  }
  .temptemp {
    margin-right: -70px;
  }
`;
export default Cart;
