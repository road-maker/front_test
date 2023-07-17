/* eslint-disable no-console */
import { Link, RichTextEditor } from '@mantine/tiptap';
// import SubScript from '@tiptap/extension-subscript';
// import Superscript from '@tiptap/extension-superscript';
// import TextAlign from '@tiptap/extension-text-align';
// import Underline from '@tiptap/extension-underline';
import { FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ReactElement, useMemo, useState } from 'react';

function TextEditor(): ReactElement {
  const [initialNodes, setIntialState] = useState([
    {
      id: '1',
      type: 'input',
      data: { label: <TextEditor /> },
      // position,
    },
    {
      id: '2',
      data: { label: 'node 2' },
      // position,
    },
    {
      id: '2a',
      data: { label: 'node 2a' },
      // position,
    },
    {
      id: '2b',
      data: { label: 'node 2b' },
      // position,
    },
    {
      id: '2c',
      data: { label: 'node 2c' },
      // position,
    },
    {
      id: '2d',
      data: { label: 'node 2d' },
      // position,
    },
    {
      id: '3',
      data: { label: 'node 3' },
      // position,
    },
    {
      id: '4',
      data: { label: 'node 4' },
      // position,
    },
    {
      id: '5',
      data: { label: 'node 5' },
      // position,
    },
    {
      id: '6',
      type: 'output',
      data: { label: 'output' },
      // position,
    },
    { id: '7', type: 'output', data: { label: 'output' } },
    // { id: '7', type: 'output', data: { label: 'output' }, position },
  ]);
  const content = initialNodes.map((node) => node?.data?.label);
  const editor = useEditor({
    extensions: [
      StarterKit,
      // Underline,
      Link,
      // Superscript,
      // SubScript,
      // Highlight,
      // TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });
  useMemo(() => {
    // console.log(content);
    initialNodes.map((v) => console.log(v));
  }, [initialNodes, content]);
  return (
    <RichTextEditor editor={editor}>
      {editor && (
        <FloatingMenu editor={editor}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.BulletList />
          </RichTextEditor.ControlsGroup>
        </FloatingMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor>
    // <RichTextEditor editor={editor}>
    //   {editor && (
    //     <BubbleMenu editor={editor}>
    //       <RichTextEditor.Toolbar sticky stickyOffset={60}>
    //         <RichTextEditor.ControlsGroup>
    //           <RichTextEditor.Bold />
    //           <RichTextEditor.Italic />
    //           <RichTextEditor.Underline />
    //           <RichTextEditor.Strikethrough />
    //           <RichTextEditor.ClearFormatting />
    //           <RichTextEditor.Highlight />
    //           <RichTextEditor.Code />
    //         </RichTextEditor.ControlsGroup>

    //         <RichTextEditor.ControlsGroup>
    //           <RichTextEditor.H1 />
    //           <RichTextEditor.H2 />
    //           <RichTextEditor.H3 />
    //           <RichTextEditor.H4 />
    //         </RichTextEditor.ControlsGroup>

    //         <RichTextEditor.ControlsGroup>
    //           <RichTextEditor.Blockquote />
    //           <RichTextEditor.Hr />
    //           <RichTextEditor.BulletList />
    //           <RichTextEditor.OrderedList />
    //           <RichTextEditor.Subscript />
    //           <RichTextEditor.Superscript />
    //         </RichTextEditor.ControlsGroup>

    //         <RichTextEditor.ControlsGroup>
    //           <RichTextEditor.Link />
    //           <RichTextEditor.Unlink />
    //         </RichTextEditor.ControlsGroup>

    //         <RichTextEditor.ControlsGroup>
    //           <RichTextEditor.AlignLeft />
    //           <RichTextEditor.AlignCenter />
    //           <RichTextEditor.AlignJustify />
    //           <RichTextEditor.AlignRight />
    //         </RichTextEditor.ControlsGroup>
    //       </RichTextEditor.Toolbar>
    //     </BubbleMenu>
    //   )}
    //   <RichTextEditor.Content />
    // </RichTextEditor>
  );
}
export default TextEditor;
