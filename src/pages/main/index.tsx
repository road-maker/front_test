import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { HeaderMegaMenu } from './header';
import { RoadmapRecommendation } from './roadmapRecommendation';

function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderMegaMenu />
      <Button onClick={() => navigate('roadmap/editor')}>Editor Page</Button>
      <RoadmapRecommendation />
    </>
  );
}
export default MainPage;
