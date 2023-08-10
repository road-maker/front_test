import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

import { HeaderMegaMenu } from './header/HeaderItem';

function MainLayout({ children }) {
  const { pathname } = useLocation();
  return (
    <>
      <HeaderMegaMenu />
      {/* <HeaderItem /> */}

      {pathname !== '/roadmap/editor' ? <Wrap>{children}</Wrap> : children}
      {/* {pathname !== '/roadmap/editor' && <Footer data={[]} />} */}
    </>
  );
}
export default MainLayout;
const Wrap = styled.section`
  width: 80vw;
  height: fit-content;
  margin: 0 auto;
`;
