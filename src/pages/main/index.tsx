import { Link, useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>MainPage</h1>
      <Link to="users/signin">로그인</Link>
      <button type="button" onClick={() => navigate('/roadmap/editor')}>
        editor page
      </button>
      <button type="button" onClick={() => navigate('/roadmap/tiptapeditor')}>
        tiptapeditor page
      </button>
      <button type="button" onClick={() => navigate('/roadmap/codeboxeditor')}>
        codebox editor page
      </button>
    </>
  );
}

export default MainPage;
