import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import BuyerTopNav from '../components/common/BuyerTopNav';
import Quantity from '../components/common/Quantity';
import Footer from '../components/common/Footer';
import {
  MButton,
  MDarkButton,
  SButton,
  SWhiteButton,
  SWhiteButtonHover,
} from '../components/common/Buttons';
import Modal from '../components/common/Modal';

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const modal = useRef(null);

  useEffect(() => {
    (async () => {
      const url = 'https://openmarket.weniv.co.kr';
      const path = `/products/${id}/`;
      const res = await fetch(url + path);
      const json = await res.json();
      setData(json);
    })();
  }, []);

  const postData = async () => {
    const url = 'https://openmarket.weniv.co.kr';
    const path = '/cart/';
    const token = localStorage.getItem('token');
    const cartData = {
      product_id: parseInt(id),
      quantity: quantity,
      check: false, // 임시. 장바구니에 해당 제품이 있는지
    };
    console.log(JSON.stringify(cartData));
    const res = await fetch(url + path, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });
    return await res.json();
  };

  const handleCardBtn = async (e) => {
    e.preventDefault();
    try {
      const data = await postData();
      modal.current.showModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMinusBtn = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlusBtn = () => {
    setQuantity(quantity + 1);
  };
  return (
    <>
      <BuyerTopNav></BuyerTopNav>
      <StyledMain>
        <h2 className='a11y-hidden'>상품 상세</h2>
        <section className='purchase'>
          <div>
            <h3 className='a11y-hidden'>상품 주요 정보</h3>
            <div className='store'>{data && data.store_name}</div>
            <strong>{data && data.product_name}</strong>
            <div className='price'>
              <span>{data && data.price}</span> 원
            </div>
            <div className='shipping'>택배배송 / 무료배송</div>
            <Quantity
              quantity={quantity}
              setQuantity={setQuantity}
              handlePlusBtn={handlePlusBtn}
              handleMinusBtn={handleMinusBtn}
            ></Quantity>
            <div className='total'>
              <span>총 상품 금액</span>
              <span className='total-quantity'>
                총 수량 <span>{quantity}</span> 개
              </span>
              <span className='total-price'>
                <span>{data && data.price * quantity}</span> 원
              </span>
            </div>
            <div className='btns'>
              <MButton>바로 구매</MButton>
              <MDarkButton onClick={handleCardBtn}>장바구니</MDarkButton>
            </div>
            <Modal ref={modal}>
              <div>
                <p>
                  이미 장바구니에 있는 상품입니다.
                  <br />
                  장바구니로 이동하시겠습니까?
                </p>
                <div>
                  <SWhiteButton onClick={() => modal.current.close()}>
                    아니요
                  </SWhiteButton>
                  <SButton onClick={() => navigate('/cart')}>예</SButton>
                </div>
              </div>
              <button
                className='close'
                aria-label='닫기'
                onClick={() => modal.current.close()}
              ></button>
            </Modal>
          </div>
          <img src={data && data.image} alt='상품' />
        </section>
        <section className='info'>
          <h3 className='a11y-hidden'>상품 상세 정보</h3>
          <ul>
            <li>
              <button className='on'>상세</button>
            </li>
            <li>
              <button>리뷰</button>
            </li>
            <li>
              <button>Q&A</button>
            </li>
            <li>
              <button>반품/교환정보</button>
            </li>
          </ul>
        </section>
      </StyledMain>
      <Footer></Footer>
    </>
  );
};

const StyledMain = styled.main`
  max-width: 1280px;
  padding: 170px 52px 0; // header height: 90px
  margin: auto;

  .purchase {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
    gap: 60px;
    margin-bottom: 140px;

    img {
      flex-basis: 600px;
      min-width: 0;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border: 1px solid var(--gray-300);
    }

    & > div {
      flex-basis: 380px; // 임시
      flex-shrink: 0;
      flex-grow: 1;
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .store {
        font-size: 1.8rem;
        line-height: 2.3rem;
        color: var(--gray-400);
        margin-bottom: 16px;
      }

      strong {
        font-size: 3.6rem;
        line-height: 4.5rem;
      }

      .price {
        margin-top: 20px;
        font-size: 1.8rem;
        margin-bottom: 40px;
        span {
          font-size: 3.6rem;
          line-height: 4.5rem;
          font-weight: 700;
        }
      }

      .shipping {
        margin-top: auto;
        color: var(--gray-400);
        font-size: 1.6rem;
        line-height: 2rem;
        width: 100%;
      }
      .shipping::after,
      .total::before {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background: var(--gray-300);
      }

      .shipping::after,
      .total::before {
        content: '';
        margin: 20px 0 30px;
      }
      .total::before {
        content: '';
        margin: 30px 0 32px;
      }

      .total {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        font-size: 1.8rem;
        font-weight: 500;
        .total-quantity {
          margin-left: auto;
          color: var(--gray-400);
          font-weight: 400;
          span {
            color: var(--brand-color);
            font-weight: 700;
          }
        }
        .total-price {
          margin-left: 28px;
          font-weight: 400;
          color: var(--brand-color);
          span {
            font-weight: 700;
            font-size: 3.6rem;
          }
        }
      }

      .btns {
        display: flex;
        gap: 14px;
        width: 100%;
        margin-top: 27px;
        button:first-child {
          flex-basis: 416px;
          flex-grow: 1;
        }

        button:last-child {
          flex-basis: 200px;
          flex-grow: 1;
        }
      }
    }
  }

  @media (max-width: 704px) {
    .purchase {
      flex-wrap: wrap;
      gap: 60px;
      margin-bottom: 140px;
    }
  }
  .info {
    margin-bottom: 140px; // 임의
    ul {
      display: flex;
      justify-content: space-between;
    }
    li {
      flex-basis: 100%;
      text-align: center;
    }
    button {
      width: 100%;
      padding: 19px 12px 12px;
      color: var(--gray-400);
      border-bottom: 6px solid var(--gray-200);
      font-size: 1.8rem;
      line-height: 2.3rem;
      font-weight: 500;
    }
    button.on {
      color: var(--brand-color);
      border-color: var(--brand-color);
      font-weight: 700;
    }
  }
`;
export default Product;
