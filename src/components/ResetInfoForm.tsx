import { ReactElement, useState } from 'react';

function ResetInfoForm(): ReactElement {
  const [verify, setVerify] = useState(false);

  function verificationHandler() {
    setVerify(true);
  }

  return (
    <>
      <h1>비밀번호 찾기</h1>
      <p>이메일</p>
      <input type="email" />
      <button type="button" onClick={verificationHandler}>
        인증하기
      </button>
      {verify && (
        <>
          <p>인증번호 입력</p>
          <input type="text" />
          <button type="button">인증하기</button>
        </>
      )}
    </>
  );
}

export default ResetInfoForm;
