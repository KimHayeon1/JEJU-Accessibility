import { styled } from 'styled-components';

const Modal = styled.dialog`
  width: 360px;
  height: 200px;
  border: 1px solid var(--gray-300);
  span {
    display: block;
    text-align: center;
    font-size: 1.6rem;
    line-height: 2rem;
  }
  span:first-child {
    margin: 50px 0 0;
  }
  span:not(:first-child) {
    margin: 0 0 30px;
  }
  div {
    text-align: center;
    button {
      width: 100px;
    }
    button:first-child {
      margin-right: 10px;
    }
  }

  .close {
    position: absolute;
    padding: 10px 20px;
    top: 8px;
    right: 6px; //18 + 8(버튼 width / 2)
  }
  .close::after,
  .close::before {
    content: '';
    display: block;
    width: 2px;
    height: 20px;
    background: var(--gray-300);
    transform: rotate(45deg);
    margin: 0;
  }
  .close::before {
    position: absolute;
    transform: rotate(-45deg);
  }
`;
export default Modal;
