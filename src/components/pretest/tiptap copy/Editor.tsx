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

  const editorTwo = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      CollaborationAnnotation.configure({
        document: ydoc,
        instance: 'editor2',
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
  return (
    <div>
      {editorOne && (
        <>
          <h1>Editor 1</h1>
          <AddTextStyles editor={editorOne} />
          <EditorContent className="editor-content" editor={editorOne} />
          <h1>Editor 2</h1>
          <EditorContent className="editor-content" editor={editorTwo} />
        </>
      )}
    </div>
  );
}

export default function TipTapEditor() {
  const chapterId = 'whydoesitalreadyexist?';
  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider(chapterId, ydoc);
  // const;
  // useEffect(() => {
  //   return () => {
  //     if (provider) {
  //       provider.destroy();
  //     }
  //   };

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <div>
      {/* <button onClick={} type="button"></button> */}
      <Editor ydoc={ydoc} />
    </div>
  );
}
