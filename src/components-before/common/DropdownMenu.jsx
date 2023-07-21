import { styled } from 'styled-components';

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  padding-top: 6px;
  left: 50%;
  transform: translate(-50%);
  & > div {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
    background: white;
    padding: 10px;
    border-radius: 10px;
  }
  a,
  button {
    word-break: keep-all;
    display: block;
    padding: 10px 18px;
    font-size: 1.6rem;
    font-weight: 500;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
  }
  button:not(:first-child),
  a:not(:first-child) {
    margin-top: 8px;
  }

  button:hover,
  a:hover {
    outline: 2px solid black;
  }
`;

export default DropdownMenu;
