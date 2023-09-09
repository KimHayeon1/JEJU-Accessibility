import { styled } from 'styled-components';

const Modal = styled.div`
position: fixed;
z-index: 1100;
inset: 0;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
  }
  & > div {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    height: 200px;
    border: 1px solid var(--gray-300);
    background: white;
  }
  p {
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.6rem;
    line-height: 2rem;
  }
  div > div {
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
    top: 18px;
    right: 26px; //18 + 8(버튼 width / 2)
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
