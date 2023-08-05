// /* eslint-disable no-console */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-unused-vars */
// import { ActionIcon } from '@mantine/core';
// import { IconPencil } from '@tabler/icons-react';
// import { Highlight } from '@tiptap/extension-highlight';
// import { Link } from '@tiptap/extension-link';
// import { Placeholder } from '@tiptap/extension-placeholder';
// import { Subscript } from '@tiptap/extension-subscript';
// import { Superscript } from '@tiptap/extension-superscript';
// import { TextAlign } from '@tiptap/extension-text-align';
// import { Underline } from '@tiptap/extension-underline';
// import { useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { useInput } from 'components/common/hooks/useInput';
// import { memo, useMemo, useState } from 'react';
// import { Handle, NodeToolbar } from 'reactflow';

// function CustomNode({
//   data,
//   id,
//   targetPosition,
//   sourcePosition,
//   toggleEditor,
// }) {
//   const [state, setState] = useState([
//     { id: '1', details: '' },
//     { id: '2', details: '' },
//   ]);
//   const [toggle, onChangeToggle, setToggle] = useInput('');
//   const editor = useEditor({
//     extensions: [
//       StarterKit, // history handled by  yjs if set to true
//       Placeholder.configure({
//         placeholder: '로드맵 상세 내용을 입력해주세요.',
//       }),
//       Underline,
//       Link,
//       Superscript,
//       Subscript,
//       Highlight,
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     // content:'',
//     content: state.filter((v) => v?.id === id)[0]?.details || '',

//     onUpdate(e) {
//       // console.log('ydoc', ydoc);
//       // console.log('ytext', ytext);
//       // console.log(e.editor?.getHTML());
//       setToggle(e.editor?.getHTML());
//       // console.log('e.editor', e.editor);
//       // eslint-disable-next-line array-callback-return
//       state.map((item, idx) => {
//         if (item?.id !== id) return;
//         // console.log('state.map, item ,label', label);

//         const copyState = [...state];
//         // copyState.splice(idx, 1, {
//         copyState.splice(idx, 1, {
//           id: item?.id,
//           details: e.editor?.getHTML(),
//         });
//         setState(copyState);
//       });
//     },
//   });
//   useMemo(() => {
//     const filt = state.filter((v) => v?.id === id);
//     // console.log(filt);
//     setToggle(filt);
//     if (editor) {
//       // mount 시 에러
//       editor.commands.setContent(filt[0]?.details, false, {
//         preserveWhitespace: 'full', // 빈칸 인식 X 에러 해결
//       });
//     }

//     if (id !== '' && filt.length === 0) {
//       setState([...state, { id, details: '' }]);
//     }
//     // console.log('state', state);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [state, id, setToggle, id, editor]);

//   return (
//     <>
//       {id && toggleEditor}
//       <NodeToolbar
//         isVisible={data.toolbarVisible}
//         position={data.toolbarPosition}
//         style={{ tranform: 'translateX(-30rem)' }}
//         onClick={() => {
//           console.log('custom targetPosition', targetPosition);
//           console.log('custom sourcePosition', sourcePosition);
//         }}
//       >
//         <ActionIcon color="blue">
//           <IconPencil size="1.2rem" />
//         </ActionIcon>
//       </NodeToolbar>
//       <div style={{ padding: '10px 20px' }}>{data.label}</div>
//       {/* <Handle type="target" position={Position.Left} /> */}
//       {/* <Handle type="source" position={Position.Right} /> */}
//       <Handle
//         type="source"
//         // position={targetPosition === 'top' ? 'bottom' : 'left'}
//         // position={sourcePosition === 'left' ? 'bottom' : 'left'}
//         // position={sourcePosition === 'left' ? 'bottom' : 'left'}
//         // position={sourcePosition === 'left' ? 'left' : 'bottom'}
//         position={
//           // sourcePosition === 'left' && targetPosition === 'right'
//           !(sourcePosition === 'right' && targetPosition === 'left')
//             ? 'top'
//             : 'right'
//         }
//         // position={targetPosition === 'left' ? 'left' : 'bottom'}
//         // position={targetPosition === 'left' ? 'left' : 'bottom'}
//       />
//       <Handle
//         type="target"
//         // position={sourcePosition === 'right' ? 'left' : 'bottom'}
//         // position={targetPosition === 'right' ? 'top' : 'right'}
//         position={
//           // sourcePosition === 'left' && targetPosition === 'right'
//           sourcePosition === 'right' && targetPosition === 'left'
//             ? 'bottom'
//             : 'left'
//         }
//       />
//     </>
//   );
// }

// export default memo(CustomNode);
