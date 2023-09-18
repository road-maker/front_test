import CommentSection from 'components/comments';
import RoadMapInfo from 'components/roadmaps/posts/RoadmapInfo';
import MainLayout from 'layout/mainLayout';

export default function RoadMapPostPage() {
  return (
    <MainLayout>
      {/* <Container size="94vw" px={0}> */}
      <RoadMapInfo />
      <CommentSection />
      {/* <RoadMap /> */}
      {/* </Container> */}
    </MainLayout>
  );
}
