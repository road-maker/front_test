import { HeaderMegaMenu } from 'pages/main/header';

function MainLayout({ children }) {
  return (
    <>
      <HeaderMegaMenu />
      {children}
    </>
  );
}
export default MainLayout;
