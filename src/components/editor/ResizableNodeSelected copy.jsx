// /* eslint-disable react-hooks/exhaustive-deps */
// import Typer from 'components/common/typingAnimation/Typer';
// import { useEffect, useState } from 'react';
// import { Handle, NodeResizer, Position } from 'reactflow';

// // export function ResizableNodeSelected({ data, selected }) {
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     if (data !== '내용을 입력해주세요.') {
// //       setIsLoading(false);
// //     }
// //   }, [isLoading]);
//   useEffect(() => {
//     window.addEventListener('error', (e) => {
//       if (e.message === 'ResizeObserver loop limit exceeded') {
//         const resizeObserverErrDiv = document.getElementById(
//           'webpack-dev-server-client-overlay-div',
//         );
//         const resizeObserverErr = document.getElementById(
//           'webpack-dev-server-client-overlay',
//         );
//         if (resizeObserverErr) {
//           resizeObserverErr.setAttribute('style', 'display: none');
//         }
//         if (resizeObserverErrDiv) {
//           resizeObserverErrDiv.setAttribute('style', 'display: none');
//         }
//       }
//     });
//   }, []);
// //   return (
// //     <>
// //       <NodeResizer
// //         color="#ff0071"
// //         isVisible={selected}
// //         minWidth={100}
// //         minHeight={30}
// //         keepAspectRatio
// //         onResize={()=>{}}
// //       />
// //       <Handle type="target" position={Position.Left} />
// //       <Handle type="target" position={Position.Top} />
// //       {data.length > 2 ? (
// //         <div style={{ padding: 10 }}>{data.label}</div>
// //       ) : (
// //         <Typer style={{ padding: 10 }} data={data.label} />
// //       )}
// //       <Handle type="source" position={Position.Right} />
// //       <Handle type="source" position={Position.Bottom} />
// //     </>
// //   );
// // }

// // export default memo(ResizableNodeSelected);

// import { drag } from 'd3-drag';
// import { select } from 'd3-selection';
// import { useRef } from 'react';
// import { useUpdateNodeInternals } from 'reactflow';

// import '@reactflow/node-resizer/dist/style.css';

// export default function ResizableNodeSelected({
//   data,
//   selected,
//   id,
//   sourcePosition = Position.Left,
//   targetPosition = Position.Right,
// }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const rotateControlRef = useRef(null);
//   const updateNodeInternals = useUpdateNodeInternals();
//   const [rotation, setRotation] = useState(0);
//   const [resizable, setResizable] = useState(true);
//   const [rotatable, setRotatable] = useState(true);

//   useEffect(() => {
//     if (data !== '내용을 입력해주세요.') {
//       setIsLoading(false);
//     }
//   }, [isLoading]);
//   useEffect(() => {
//     if (!rotateControlRef.current) {
//       return;
//     }

//     const selection = select(rotateControlRef.current);
//     const dragHandler = drag().on('drag', (evt) => {
//       const dx = evt.x - 100;
//       const dy = evt.y - 100;
//       const rad = Math.atan2(dx, dy);
//       const deg = rad * (180 / Math.PI);
//       setRotation(180 - deg);
//       updateNodeInternals(id);
//     });

//     selection.call(dragHandler);
//   }, [id, updateNodeInternals]);

//   return (
//     <>
//       <div
//         style={{
//           transform: `rotate(${rotation}deg)`,
//         }}
//         className={styles.node}
//       >
//         <NodeResizer isVisible={resizable} minWidth={180} minHeight={100} />
//         <div
//           ref={rotateControlRef}
//           style={{
//             display: rotatable ? 'block' : 'none',
//           }}
//           className={`nodrag ${styles.rotateHandle}`}
//         />
//         <div>
//           {data.length > 2 ? (
//             <div style={{ padding: 10 }}>{data.label}</div>
//           ) : (
//             <Typer style={{ padding: 10 }} data={data.label} />
//           )}
//           <div>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={resizable}
//                 onChange={(evt) => setResizable(evt.target.checked)}
//               />
//               resizable
//             </label>
//           </div>
//           <div>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={rotatable}
//                 onChange={(evt) => setRotatable(evt.target.checked)}
//               />
//               rotatable
//             </label>
//           </div>
//         </div>
//         <Handle
//           style={{ opacity: 0 }}
//           position={sourcePosition}
//           type="source"
//         />
//         <Handle
//           style={{ opacity: 0 }}
//           position={targetPosition}
//           type="target"
//         />
//       </div>
//     </>
//   );
// }
