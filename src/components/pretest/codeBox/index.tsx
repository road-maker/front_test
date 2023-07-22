/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Editor } from 'react-draft-wysiwyg';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

import { useInput } from '../../common/hooks/useInput';
import CodeBox from './CodeBox';
// import { store, webrtcProvider } from './store';

const colors = [
  '#958DF1',
  '#F98181',
  '#FBBC88',
  '#FAF594',
  '#70CFF8',
  '#94FADB',
  '#B9F18D',
];
const names = ['Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna'];

const getRandomElement = (list) =>
  list[Math.floor(Math.random() * list.length)];
const getRandomColor = () => getRandomElement(colors);
const getRandomName = () => getRandomElement(names);

// import { store, webrtcProvider } from './store';
const doc = new Y.Doc();
const wsProvider = new WebsocketProvider(
  'ws://localhost:1234',
  'my-roomname',
  doc,
);
// wsProvider.on('status', (event) => {
//   // eslint-disable-next-line no-console
//   console.log('event status', event.status); // logs "connected" or "disconnected"
// });
export default function CodeBoxEditor({ editorState, onChange }) {
  const [content, onChangeContent, setContent] = useInput([]);
  const [opened, { open, close }] = useDisclosure(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
      Collaboration.configure({
        // fragment: 'xml',
        document: doc,
        // fragment: store.fragment,
      }),
      CollaborationCursor.configure({
        provider: wsProvider,
        // provider: webrtcProvider,
        user: { name: getRandomName(), color: getRandomColor() },
      }),
    ],
  });

  return (
    <div className="editor">
      <CodeBox />
      <MenuBar editor={editor} />

      <Editor
        editorState={editorState}
        onEditorStateChange={onChange}
        ariaLabel="contents"
        placeholder="내용을 작성해주세요."
        wrapperClassName="wrapper-class"
        toolbarClassName="toolbar"
        editorClassName="editor"
        localization={{
          locale: 'ko',
        }}
        toolbar={{
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
      <Modal opened={opened} onClose={close} title="Authentication">
        얍
      </Modal>
      <EditorContent
        editor={editor}
        onClick={open}
        // onChange={onChangeContent}
        // content={content}
      />

      {/* <EditorContent
        editor={editor}
        onChange={onChangeContent}
        content={content}
      /> */}
    </div>
  );
}

function MenuBar({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        clear marks
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        clear nodes
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        horizontal rule
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        hard break
      </button>
      <button type="button" onClick={() => editor.chain().focus().undo().run()}>
        undo
      </button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()}>
        redo
      </button>
    </>
  );
}
