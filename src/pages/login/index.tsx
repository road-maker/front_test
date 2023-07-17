import { json, redirect } from 'react-router-dom';

import LoginForm from '../../components/LoginForm';

function LoginPage() {
  return <LoginForm />;
}

export default LoginPage;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch('http://52.79.185.147/api/users/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });
  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }
  // eslint-disable-next-line no-console
  console.log(response, authData);
  return redirect('/');
}
