import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from '../../assets/icons/logo.svg';
import cart from '../../assets/icons/cart.svg';
import user from '../../assets/icons/user.svg';
import search from '../../assets/icons/search.svg';
import DropdownMenu from './DropdownMenu';
import { useState } from 'react';

const BuyerTopNav = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <StyledHeader>
      <div>
        <h1>
          <Link to='/'>
            <img src={logo} alt='호두 로고' />
          </Link>
        </h1>

        <form>
          <label className='a11y-hidden' htmlFor='keword-inp'>
            통합 검색어 입력
          </label>
          <input
            id='keword-inp'
            type='text'
            placeholder='상품을 검색해보세요!'
          />
          <button>
            <img src={search} alt='검색하기' />
          </button>
        </form>

        <Link id='cart' to='/cart' className='menu'>
          <img src={cart} alt='' />
          장바구니
        </Link>
        <div
          className='menu myPage'
          onFocus={() => setShowDropdown(true)}
          onMouseOver={() => setShowDropdown(true)}
          onMouseOut={() => setShowDropdown(false)}
        >
          {/* 태그 고민 */}
          <a href='#none'>
            <img src={user} alt='' aria-label='드롭 다운 토글' />
            마이페이지
          </a>
          {showDropdown && (
            <DropdownMenu aria-label='드롭 다운 메뉴'>
              <div>
                <a href='#none'>마이페이지</a>
                <button onBlur={() => setShowDropdown(false)}>로그아웃</button>
              </div>
            </DropdownMenu>
          )}
        </div>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: fixed;
  z-index: 1000;
  width: 100%;
  box-shadow: 0 4px 5px #00000010;
  background: white;

  & > div {
    max-width: 1280px;
    margin: auto;
    padding: 22px 52px; // 52 임의
    display: flex;
    align-items: center;
  }

  h1 {
    width: 124px;
    margin-right: 30px;
  }

  form {
    position: relative;
    display: flex;
    input {
      box-sizing: border-box;
      width: 400px;
      padding: 11px 50px 11px 22px;
      font-size: 1.6rem;
      line-height: 2rem;
      border: 2px solid var(--brand-color);
      border-radius: 46px;
    }
    input::placeholder {
      color: var(--gray-400);
    }
    button {
      position: absolute;
      width: 28px;
      top: 0;
      bottom: 0;
      right: 23px;
      margin: auto 0;
    }
  }

  .menu {
    color: var(--gray-400);
    font-size: 1.2rem;

    img {
      margin: 0 auto 4px;
      width: 32px;
    }

    &#cart img {
      margin-left: 2px;
    }

    &:not(:last-child) {
      margin-left: auto;
    }

    &:last-child {
      margin-left: 38px;
    }
  }
  .myPage {
    position: relative;
    & > a {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
`;

export { StyledHeader };
export default BuyerTopNav;
