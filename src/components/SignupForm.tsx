import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

function SignupForm(): ReactElement {
  return (
    <>
      <form>
        <h1>회원가입</h1>
        <p>이름</p>
        <input type="text" />
        <p>닉네임</p>
        <input type="text" />
        <p>이메일</p>
        <input type="email" />
        <p>비밀번호</p>
        <input type="password" />
        <button type="button">회원가입</button>
      </form>
      <p>OR</p>
      <button type="button">구글 계정으로 회원가입하기</button>
      <p>
        <Link to=".." relative="path">
          이미 계정이 있으신가요?
        </Link>
      </p>
    </>
  );
}

export default SignupForm;
