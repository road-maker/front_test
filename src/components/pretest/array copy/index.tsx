/* eslint-disable no-console */
import RoadMapEditor from 'components/editor/RoadMapEditor';
import { useEffect, useRef, useState } from 'react';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

export default function BasicTest() {
  const ydoc = useRef(null);
  const ytext = useRef(null);

  useEffect(() => {
    ydoc.current = new Y.Doc();
    const wsProvider = new WebsocketProvider(
      'ws://localhost:1234',
      'please',
      ydoc.current,
    );

    wsProvider.on('status', (event) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });

    ytext.current = ydoc.current.getText('600');
    ytext.current.observe(() => {
      console.log(ytext.current.toString());
      setState(ytext.current.toString());
    });
  }, []);

  const [state, setState] = useState('');

  const onChangeHandler = (e) => {
    ydoc.current.transact(() => {
      ytext.current.delete(0, ytext.current.toString().length);
      ytext.current.insert(0, e.target.value);
    });
  };
  //   const editorOne = useEditor({
  //     extensions: [
  //       StarterKit.configure({ history: false }),
  //       CollaborationAnnotation.configure({
  //         document: ydoc,
  //         instance: 'editor1',
  //       }),
  //       Collaboration.configure({
  //         document: ydoc,
  //       }),
  //     ],
  //     content: `

  //       `,
  //     onUpdate(e) {
  //       ydoc.current.transact(() => {
  //         ytext.current.delete(0, ytext.current.toString().length);
  //         ytext.current.insert(0, e.target.value);
  //       });
  //     },
  //   });

  // On Your Network: http://192.168.177.1:3000 로 들어가야 보임. localhost은 안보임
  return (
    <div>
      <input
        value={state}
        onChange={onChangeHandler}
        style={{ color: 'purple' }}
      />
      <div>
        <p style={{ color: 'purple' }}>{state}</p>
      </div>
      <RoadMapEditor editor={state} setState={setState} />
    </div>
  );
}
