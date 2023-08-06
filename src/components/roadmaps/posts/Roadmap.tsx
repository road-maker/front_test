// import { Button, Center, Drawer, Highlight } from '@mantine/core';
// import Subscript from '@tiptap/extension-subscript';
// import Superscript from '@tiptap/extension-superscript';
// import TextAlign from '@tiptap/extension-text-align';
// import Underline from '@tiptap/extension-underline';
// import { EditorContent, useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { useInput } from 'components/common/hooks/useInput';
// import { useUser } from 'components/user/hooks/useUser';
// import { useMemo, useState } from 'react';
// import { Link, useLocation, useSearchParams } from 'react-router-dom';
// import {
//   Background,
//   Controls,
//   MiniMap,
//   ReactFlow,
//   ReactFlowProvider,
//   useEdgesState,
//   useNodesState,
// } from 'reactflow';
// import { styled } from 'styled-components';

// import { useRoadmapData } from './hooks/useRoadMapResponse';

// export default function RoadMap() {
//   const { pathname } = useLocation();
//   const { roadmapById } = useRoadmapData(
//     pathname.slice(pathname.lastIndexOf('/') + 1),
//   );
//   const [currentRoadmap, setCurrentRoadmap] = useState(roadmapById?.data || []);
//   const [label, onChangeLabel, setLabel] = useInput('');
//   const [id, onChangeId, setId] = useInput('');
//   const [toggle, onChangeToggle, setToggle] = useInput('');
//   const [search] = useSearchParams();
//   const { user } = useUser();
//   const [state, setState] = useState([]);
//   const [details, setDetails] = useState([]);

//   const [nodeState, setNodes, onNodesChange] = useNodesState([]);
//   const [edgeState, setEdges, onEdgesChange] = useEdgesState([]);
//   const [isSelectable] = useState(true);
//   const [isDraggable] = useState(false);
//   const [isConnectable] = useState(false);
//   const [zoomOnScroll] = useState(true); // zoom in zoom out
//   const [panOnScroll] = useState(false); // 위아래 스크롤
//   const [zoomOnDoubleClick] = useState(false);
//   const [panOnDrag] = useState(true); // 마우스로 이동
//   const [isOpen, setIsOpen] = useState(false);

//   const proOptions = { hideAttribution: true };
//   const nodeTypes = {
//     custom: ResizableNodeSelected,
//   };
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Link,
//       Superscript,
//       Subscript,
//       Highlight,
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     editable: false,
//     content: state.filter((v) => v.id === id)[0]?.details || '',
//     onUpdate(e) {
//       setToggle(e.editor?.getHTML());
//       state.forEach((item, idx) => {
//         if (item.id !== id) return;

//         const copyState = [...state];
//         copyState.splice(idx, 1, {
//           id: item.id,
//           details: e.editor?.getHTML(),
//         });
//         setState(copyState);
//       });
//     },
//   });

//   useMemo(() => {
//     const filt = state.filter((v) => v.id === id);
//     setToggle(filt);
//     if (editor) {
//       editor.commands.setContent(filt[0]?.details || '');
//     }
//   }, [state, id, setToggle, label, editor]);
//   return (
//     <>
//       {' '}
//       <EditorWrap>
//         <div className="roadMapWrap">
//           <ReactFlowProvider>
//             <Wrap style={{ height: '70vh' }}>
//               <ReactFlow
//                 nodes={nodeState}
//                 edges={edgeState}
//                 proOptions={proOptions}
//                 onNodesChange={onNodesChange}
//                 onEdgesChange={onEdgesChange}
//                 elementsSelectable={isSelectable}
//                 nodesConnectable={isConnectable}
//                 nodesDraggable={isDraggable}
//                 zoomOnScroll={zoomOnScroll}
//                 panOnScroll={panOnScroll}
//                 zoomOnDoubleClick={zoomOnDoubleClick}
//                 panOnDrag={panOnDrag}
//                 attributionPosition="top-right"
//                 minZoom={0.2}
//                 maxZoom={4}
//                 nodeTypes={nodeTypes}
//                 onNodeClick={(e, n) => {
//                   setLabel(`${n?.data?.label}`);
//                   setId(`${n?.id}`);
//                   setIsOpen(!isOpen);
//                 }}
//                 fitView
//                 style={{
//                   backgroundColor: '#ebf6fc',
//                 }}
//               >
//                 <Background gap={16} />
//                 <Controls />
//                 <MiniMap zoomable pannable />
//               </ReactFlow>
//               <Drawer
//                 opened={isOpen}
//                 onClose={() => setIsOpen(!isOpen)}
//                 overlayProps={{ opacity: 0.5, blur: 4 }}
//                 position="right"
//                 size="35%"
//               >
//                 <Center>
//                   <EditorContent editor={editor} readOnly />
//                 </Center>
//                 <Center>
//                   <Button
//                     mt={30}
//                     onClick={() => setIsOpen(!isOpen)}
//                     variant="light"
//                   >
//                     닫기
//                   </Button>
//                 </Center>
//               </Drawer>
//             </Wrap>
//           </ReactFlowProvider>
//         </div>
//       </EditorWrap>
//     </>
//   );
// }
// const Wrap = styled.div`
//   width: 100%;
//   height: 60vh;
//   & .updatenode__controls {
//     position: absolute;
//     right: 10px;
//     top: 10px;
//     z-index: 4;
//     font-size: 12px;
//   }

//   & .updatenode__controls label {
//     display: block;
//   }

//   & .updatenode__bglabel {
//     margin-top: 10px;
//   }

//   & .updatenode__checkboxwrapper {
//     margin-top: 10px;
//     display: flex;
//     align-items: center;
//   }
// `;
// const EditorWrap = styled.div`
//   & .editor {
//     & > .content {
//       width: 100%;
//     }
//   }

//   & .roadMapWrap {
//     overflow-x: hidden;
//   }
// `;
export default function RoadMap() {
  return <> </>;
}
