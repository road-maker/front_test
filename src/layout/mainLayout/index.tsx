import { Footer } from './footer/Footer';
import { HeaderMegaMenu } from './header/Header';

function MainLayout({ children }) {
  return (
    <>
      <HeaderMegaMenu />
      {children}
      <Footer data={[]} />
    </>
  );
}
export default MainLayout;
