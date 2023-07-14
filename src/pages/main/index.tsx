import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <>
      <h1>MainPage</h1>
      <Link to="login">로그인</Link>
    </>
  );
}

export default MainPage;
