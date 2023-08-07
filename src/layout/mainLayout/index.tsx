import { useLocation } from 'react-router-dom';

import { Footer } from './footer/Footer';
import { HeaderMegaMenu } from './header/Header';

function MainLayout({ children }) {
  const { pathname } = useLocation();
  return (
    <>
      <HeaderMegaMenu />
      {children}
      {pathname !== '/roadmap/editor' && <Footer data={[]} />}
    </>
  );
}
export default MainLayout;
