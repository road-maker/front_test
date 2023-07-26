// import { HeaderMegaMenu } from 'pages/main/header';
import { HeaderMegaMenu } from './header/header';

function MainLayout({ children }) {
  return (
    <>
      <HeaderMegaMenu />
      {children}
    </>
  );
}
export default MainLayout;
