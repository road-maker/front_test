// import { Modal } from '@mantine/core';
// // import { RichTextEditor } from '@mantine/tiptap';
// // import { Highlight } from '@tiptap/extension-highlight';
// // import { Link } from '@tiptap/extension-link';
// // import { Placeholder } from '@tiptap/extension-placeholder';
// // import { Subscript } from '@tiptap/extension-subscript';
// // import { Superscript } from '@tiptap/extension-superscript';
// // import { TextAlign } from '@tiptap/extension-text-align';
// // import { Underline } from '@tiptap/extension-underline';
// // import { useEditor } from '@tiptap/react';
// // import StarterKit from '@tiptap/starter-kit';
// import { useState } from 'react';
// import { Handle, NodeToolbar, Position } from 'reactflow';

// function CustomNode({ data, selected }) {
//   // const [text, setText] = useState('');
//   const [opened, setOpened] = useState(false);
//   // const [label, onChangeLabel, setLabel] = useInput('');
//   // const [id, onChangeId, setId] = useInput('');
//   // // const [toggle, setToggle] = useState(null);
//   // // const [toggle, onChangeToggle, setToggle] = useInput('');
//   // const [search] = useSearchParams();
//   // // const [state, onChangeHandler, setState] = useInput('');
//   // // const [state, setState] = useState([
//   // //   { id: '1', details: 'sdsd' },
//   // //   { id: '2', details: 'asasdafagfdhfgh' },
//   // // ]);
//   // // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   // const [roadMapTitle, onRoadMapTitleChange, setRoadMapTitle] = useInput(
//   //   search.get('title') || '',
//   // );
//   // const ydoc = useRef(null);
//   // const ytext = useRef(null);

//   const openModal = () => {
//     setOpened(true);
//   };

//   const closeModal = () => {
//     setOpened(false);
//   };

//   // const handleInputChange = (event) => {
//   //   setText(event.target.value);
//   // };

//   // useEffect(() => {
//   //   window.addEventListener('error', (e) => {
//   //     if (e.message === 'ResizeObserver loop limit exceeded') {
//   //       const resizeObserverErrDiv = document.getElementById(
//   //         'webpack-dev-server-client-overlay-div',
//   //       );
//   //       const resizeObserverErr = document.getElementById(
//   //         'webpack-dev-server-client-overlay',
//   //       );
//   //       if (resizeObserverErr) {
//   //         resizeObserverErr.setAttribute('style', 'display: none');
//   //       }
//   //       if (resizeObserverErrDiv) {
//   //         resizeObserverErrDiv.setAttribute('style', 'display: none');
//   //       }
//   //     }
//   //   });
//   // }, []);

//   return (
//     <>
//       <Modal opened={opened} onClose={closeModal}>
//         bb
//       </Modal>
//       {/* <NodeResizer
//         color="#ff0071"
//         isVisible={selected}
//         minWidth={100}
//         minHeight={30}
//       /> */}
//       {/* <Handle type="target" position={Position.Left} />
//       <Handle type="source" position={Position.Right} /> */}
//       <NodeToolbar
//         isVisible={data.toolbarVisible}
//         position={data.toolbarPosition}
//       >
//         <button type="button" onClick={openModal}>
//           상세정보 보기
//         </button>
//         {/* <button type="button">copy</button>
//         <button type="button">expand</button> */}
//       </NodeToolbar>
//       <div style={{ padding: '10px 20px' }}>{data.label}</div>
//       <Handle type="target" position={Position.Left} />
//       <Handle type="source" position={Position.Right} />
//     </>
//   );
// }

// export default CustomNode;
