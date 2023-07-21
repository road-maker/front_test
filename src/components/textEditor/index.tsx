/* eslint-disable no-console */
import { Color } from '@tiptap/extension-color';
// eslint-disable-next-line import/no-extraneous-dependencies
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import RoadMapEditor from 'components/editor/RoadMapEditor';
import { ReactElement, useCallback, useEffect } from 'react';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';

import MenuBar from './MenuBar';

const doc = new Y.Doc();
const documentList = doc.getArray('doc-list');

const wsProvider = new WebrtcProvider('my-roomname', doc);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { awareness } = wsProvider;
export default function TextEditor() {
  useEffect(() => {
    if (wsProvider.connected) {
      wsProvider.destroy();
    }
  }, []);
  // const [editorContent, setEditorContent] = useState('');
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle?.name, ListItem?.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    onUpdate(v) {
      console.log(editor.getText());
      console.log(editor.getHTML());
      // console.log('update!', v);
    },
    content: `<input type="text"/>`,
  });

  documentList.observe((event) => {
    // Log a delta every time the type changes
    // Learn more about the delta format here: https://quilljs.com/docs/delta/
    console.log('delta:', event.changes.delta);
    console.log('documentList:', documentList);
  });

  // wsProvider.on('status', (event) => {
  //   console.log(event.status); // logs "connected" or "disconnected"
  // });
  // const addDocumentHandler = () => {
  //   documentList.insert(0, [<TextEditor />, 2, 3]);
  // };
  const addDocumentHandler = useCallback(() => {
    if (documentList.length > 0) {
      documentList.insert(documentList.length - 1, [
        <div style={{ backgroundColor: 'magenta' }}>
          {/* <PureEditorContent editor={editor} /> */}
          <input type="text" />
          <button type="button">delete text</button>
          {/* <TextEditor /> */}
        </div>,
      ]);
    } else {
      documentList.insert(0, [
        <div style={{ backgroundColor: 'magenta' }}>
          {/* <PureEditorContent editor={editor} /> */}
          <input type="text" />
          <button type="button">delete text</button>
          {/* <TextEditor /> */}
        </div>,
      ]);
    }
  }, []);

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <button type="button" onClick={() => addDocumentHandler()}>
        추가
      </button>
      {documentList ? (
        documentList
          .toArray()
          .map(
            (v, idx) =>
              (<div key={idx}>{v as ReactElement}</div>) as ReactElement,
          )
      ) : (
        <div>empty</div>
      )}
      <RoadMapEditor
        editor={editor?.getHTML()}
        // eslint-disable-next-line no-alert
        setState={alert('innerhtml changing')}
      />
    </div>
  );
}
