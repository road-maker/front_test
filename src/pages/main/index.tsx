import { axiosInstance } from 'axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  async function sayHello(): Promise<string> {
    const { data } = await axiosInstance.get('/hello');
    return data;
  }

  return (
    <>
      <h1>MainPage</h1>
      <Link to="login">로그인</Link>
      <button type="button" onClick={() => navigate('/roadmap/editor')}>
        editor page
      </button>
      <div>{sayHello()}</div>
    </>
  );
}

export default MainPage;
