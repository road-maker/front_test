import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { HeaderMegaMenu } from './header';
import { RoadmapRecommendation } from './roadmapRecommendation';

function MainPage() {
  return (
    <>
      <HeaderMegaMenu />
      <RoadmapRecommendation />
    </>
  );
}
export default MainPage;
