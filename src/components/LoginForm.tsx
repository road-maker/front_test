import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

function LoginForm(): ReactElement {
  return (
    <>
      <form>
        <h1>로그인</h1>
        <p>이메일</p>
        <input type="email" />
        <p>비밀번호</p>
        <input type="password" />

        <Link to="/">
          <button type="button">로그인</button>
        </Link>
        <p>
          <Link to="/users/reset">아이디/비밀번호찾기</Link>
        </p>
      </form>
      <p>OR</p>
      <button type="button">구글 계정으로 로그인하기</button>
      <Link to="/users/signup">회원가입</Link>
    </>
  );
}

export default LoginForm;
