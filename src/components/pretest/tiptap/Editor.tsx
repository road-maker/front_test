import Collaboration from '@tiptap/extension-collaboration';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import { styled } from 'styled-components';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';

import { CollaborationAnnotation } from './extensions/collaboration-annotation';

const chapterId = '123456123123aaaa';
const ydoc = new Y.Doc();
const provider = new WebrtcProvider(chapterId, ydoc);

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
      {/* 
      <button
        type="button"
        onClick={() => addComment(editor)}
        className={
          editor.isActive('underline')
            ? 'btn btn-primary-black'
            : 'btn btn-primary-inactive'
        }
      >
        <span>Annotation</span>
      </button> */}
    </>
  );
}
export default function TipTapEditor() {
  const [comments, setComments] = useState();
  const editorOne = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Comment,
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
      Comment,
      CollaborationAnnotation.configure({
        document: ydoc,
        // onUpdate: (items) => {
        //   const comments = items;
        //   setComments(comments);
        // },
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
    <Editor ydoc={ydoc}>
      {editorOne && (
        <>
          <h1>Editor 1</h1>
          <AddTextStyles editor={editorOne} />
          <EditorContent className="editor-content" editor={editorOne} />
          <h1>Editor 2</h1>
          <EditorContent className="editor-content" editor={editorTwo} />
        </>
      )}
    </Editor>
  );
}
const Editor = styled.div`
  width: 9em;
`;
