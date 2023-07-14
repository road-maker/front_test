import { axiosInstance } from 'axiosInstance';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  async function sayHello(): Promise<string> {
    const { data } = await axiosInstance.get('/hello');
    return data;
  }
  useEffect(() => {
    const test = sayHello();
    // eslint-disable-next-line no-console, no-alert
    alert(`hello?${test}`);
  }, []);
  return (
    <>
      <h1>MainPage</h1>
      <Link to="login">로그인</Link>
      <button type="button" onClick={() => navigate('/roadmap/editor')}>
        editor page
      </button>
    </>
  );
}

export default MainPage;
