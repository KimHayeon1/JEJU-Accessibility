import { useRef, useState } from 'react';
import { StyledArticle } from '../components/common/StyledArticle';
import { MButton } from '../components/common/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Logo from '../assets/icons/logo.svg';

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(''); // (e.target[0].value);
  const [password, setPassword] = useState(''); // (e.target[1].value);

  const getData = async () => {
    const url = 'https://openmarket.weniv.co.kr';
    const path = '/accounts/login/';
    const loginData = {
      username: id,
      password: password,
      login_type: 'BUYER',
    };
    const res = await fetch(url + path, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    return await res.json();
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    if (!id) {
      errorEl.current.textContent = '';
      errorEl.current.textContent = '아이디를 입력해 주세요.';
      idInp.current.focus();
      return;
    }
    if (!password) {
      errorEl.current.textContent = '';
      errorEl.current.textContent = '비밀번호를 입력해 주세요.';
      passwordInp.current.focus();
      return;
    }
    try {
      const data = await getData();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_type', data.user_type);
        navigate('/');
      } else if (data.FAIL_Message) {
        errorEl.current.textContent = '';
        errorEl.current.textContent =
          '아이디 또는 비밀번호가 일치하지 않습니다.';
      idInp.current.focus();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const errorEl = useRef();
  const idInp = useRef();
  const passwordInp = useRef();
  return (
    <>
      <StyledH1>
        <img src={Logo} alt='호두 로고' />
      </StyledH1>
      <StyledArticle>
        <h2 className='a11y-hidden'>로그인</h2>

        <form onSubmit={handleForm}>
          <label htmlFor='id-inp' className='a11y-hidden'>
            아이디 입력
          </label>
          <input
            id='id-inp'
            type='text'
            ref={idInp}
            placeholder='아이디'
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <label htmlFor='password-inp' className='a11y-hidden'>
            비밀번호 입력
          </label>
          <input
            id='password-inp'
            type='text'
            ref={passwordInp}

            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <strong ref={errorEl} role='alert'></strong>
          <MButton>로그인</MButton>
        </form>
        <StyledLinks>
          <Link to='/join'>회원가입</Link>
          <Link onClick={() => alert('아직 기능이 개발되지 않았습니다.')}>
            비밀번호 찾기
          </Link>
        </StyledLinks>
      </StyledArticle>
    </>
  );
};

const StyledH1 = styled.h1`
  margin: 150px auto 0; //150 임시
  width: 238px;
`;

const StyledLinks = styled.div`
  position: relative;
  text-align: center;
  margin-top: 40px;
  a {
    color: var(--gray-500);
    font-size: 1.6rem;
    padding: 8px 15px;
  }

  a:first-child {
    position: relative;
  }

  a:first-child::after {
    content: '';
    position: absolute;
    right: 0;
    top: 11px;
    height: 1.6rem;
    width: 1px;
    background: var(--gray-500);
  }
`;

export default Login;
