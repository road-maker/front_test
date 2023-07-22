/* eslint-disable no-console */
import { RichTextEditor } from '@mantine/tiptap';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ReactElement, useEffect, useRef } from 'react';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

import { useInput } from '../../components/common/hooks/useInput';
import RoadMapCanvas from '../../components/editor/RoadMapEditor';
import BasicTest from '../../components/pretest/array';

export default function RoadMapEditor(): ReactElement {
  //   const [state, setState] = useState('');
  const [state, onChangeHandler, setState] = useInput('');
  const ydoc = useRef(null);
  const ytext = useRef(null);
  useEffect(() => {
    ydoc.current = new Y.Doc();
    const wsProvider = new WebsocketProvider(
      'ws://localhost:1234',
      'please',
      ydoc.current,
    );

    // wsProvider.on('status', (event) => {
    //   console.log(event.status); // logs "connected" or "disconnected"
    // });
    wsProvider.shouldConnect = false;

    ytext.current = ydoc.current.getText('600');
    ytext.current.observe(() => {
      console.log(ytext.current.toString());
      setState(ytext.current.toString());
      onChangeHandler(ytext.current.toString());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Placeholder.configure({ placeholder: '\n\nThis is placeholder\n\n' }),
      //   Underline,
      //   Link,
      //   Superscript,
      //   SubScript,
      //   Highlight,
      //   TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    // content: state,
    content: `<div onChange={onChangeHandler}>${state}</div>`,
    onUpdate(e) {
      console.log('ydoc', ydoc);
      console.log('ytext', ytext);
      console.log(e.editor?.getHTML());
      setState(e.editor?.getHTML());
    },
  });

  return (
    <>
      <BasicTest state={state} setState={setState} ydoc={ydoc} ytext={ytext} />
      <div>
        <RichTextEditor editor={editor}>
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>
      </div>
      <RoadMapCanvas editor={state} setState={setState} />
    </>
  );
}
