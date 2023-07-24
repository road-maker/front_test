import LoginForm from '../../components/user/forms/LoginForm';
import MainLayout from '../../layout/mainLayout';

function LoginPage() {
  // const { user } = useUser();
  return (
    <MainLayout>
      <LoginForm />
    </MainLayout>
  );
}

export default LoginPage;
