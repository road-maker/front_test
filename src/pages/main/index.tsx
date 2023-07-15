import { Link, useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  // async function sayHello(): Promise<string> {
  //   const { data } = await axiosInstance.get('/hello');
  //   return data;
  // }
  // useEffect(() => {
  // const test = sayHello();
  // eslint-disable-next-line no-console
  // console.log(test);
  // }, []);

  return (
    <>
      <h1>MainPage</h1>
      <Link to="users/signin">로그인</Link>
      <button type="button" onClick={() => navigate('/roadmap/editor')}>
        editor page
      </button>
    </>
  );
}

export default MainPage;
