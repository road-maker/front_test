/* eslint-disable no-console */
import Collaboration from '@tiptap/extension-collaboration';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';

import { CollaborationAnnotation } from './extensions/collaboration-annotation';

function AddTextStyles({ editor }) {
  return (
    <>
      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
        className={
          editor.isActive('bold')
            ? 'btn btn-primary-black'
            : 'btn btn-primary-inactive'
        }
      >
        <b>B</b>
      </button>

      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
        className={
          editor.isActive('italic')
            ? 'btn btn-primary-black'
            : 'btn btn-primary-inactive'
        }
      >
        <em>I</em>
      </button>

      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleUnderline().run();
        }}
        className={
          editor.isActive('underline')
            ? 'btn btn-primary-black'
            : 'btn btn-primary-inactive'
        }
      >
        <span style={{ textDecoration: 'underline' }}>U</span>
      </button>
    </>
  );
}

export function Editor({ ydoc }) {
  const editorOne = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      CollaborationAnnotation.configure({
        document: ydoc,
        instance: 'editor1',
      }),
      Collaboration.configure({
        document: ydoc,
      }),
    ],
    content: `
        <p>
          Annotations can be used to add additional information to the content, for example comments. They live on a different level than the actual editor content.
        </p>
        <p>
          This example allows you to add plain text, but you’re free to add more complex data, for example JSON from another tiptap instance. :-)
        </p>
      `,
  });

  // useEffect((editor)=>{},[
  //   const editorRef = useRef(null);
  //   editorRef.current = editor;
  //   console.log('editorRef.current',editorRef.current);
  // ])

  return (
    <div>
      {editorOne && (
        <>
          <h1>Editor 1</h1>
          <AddTextStyles editor={editorOne} />
          <EditorContent className="editor-content" editor={editorOne} />
        </>
      )}
    </div>
  );
}

export default function TipTapEditor() {
  // eslint-disable-next-line prefer-const
  let binding = null;
  const chapterId = 'shared-test?';
  const ydoc = new Y.Doc();
  // console.log(ydoc.getText('tiptap'));
  console.log(ydoc.getArray('doc-list'));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const provider = new WebrtcProvider(chapterId, ydoc);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { awareness } = provider;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const bindEditor = (ytext) => {
    if (binding) {
      // 이미 존재하는 editor 재사용 but 바인딩 이전
      // 이벤트 핸들러 제거
      binding.destroy();
    }
    // 첫유저가 document열었을때, 에디터가 아직 초기화 안됨
    // editor 인스턴스 생성
  };

  return (
    <div>
      {/* <button onClick={} type="button"></button> */}
      <Editor ydoc={ydoc} />
    </div>
  );
}
