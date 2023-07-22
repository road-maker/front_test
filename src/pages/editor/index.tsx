/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useState } from 'react';

import RoadMapEditor from '../../components/editor/RoadMapEditor';

function EditorPage(): ReactElement {
  const [fakeState, setFakeState] = useState('');
  return (
    <>
      {/* <Tiptap /> */}
      <RoadMapEditor editor={fakeState} setState={fakeState} />
    </>
  );
}
export default EditorPage;
