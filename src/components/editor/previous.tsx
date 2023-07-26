// /* eslint-disable no-console */
// /* eslint-disable react/no-danger */
// /* eslint-disable simple-import-sort/imports */
// import 'reactflow/dist/style.css';

// import dagre from '@dagrejs/dagre';
// import { useCallback, useEffect, useMemo, useState } from 'react';
// import ReactFlow, {
//   Background,
//   Controls,
//   MiniMap,
//   Panel,
//   addEdge,
//   useEdgesState,
//   useNodesState,
//   useReactFlow,
// } from 'reactflow';

// import { usePromptAnswer } from 'components/prompts/hooks/usePromptResponse';
// import { useRoadmap } from 'components/roadmaps/hooks/useRoadmap';
// import { useSearchParams } from 'react-router-dom';
// import { getStoredRoadmap, setStoredRoadmap } from 'storage/roadmap-storage';
// import ResizableNodeSelected from './ResizableNodeSelected';
// import { RoadmapEdge, RoadmapNodes } from './types';

// const dagreGraph = new dagre.graphlib.Graph();
// dagreGraph.setDefaultEdgeLabel(() => ({}));

// const nodeWidth = 172;
// const nodeHeight = 36;

// const flowKey = 'example-flow';

// const getLayoutedElements = (nodes, edges, direction = 'TB') => {
//   const isHorizontal = direction === 'LR';
//   dagreGraph.setGraph({ rankdir: direction });

//   nodes.forEach((node) => {
//     dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
//   });

//   edges.forEach((edge) => {
//     dagreGraph.setEdge(edge.source, edge.target);
//   });

//   dagre.layout(dagreGraph);

//   nodes.forEach((node) => {
//     const nodeWithPosition = dagreGraph.node(node.id);
//     // eslint-disable-next-line no-param-reassign
//     node.targetPosition = isHorizontal ? 'left' : 'top';
//     // eslint-disable-next-line no-param-reassign
//     node.sourcePosition = isHorizontal ? 'right' : 'bottom';
//     // We are shifting the dagre node position (anchor=center center) to the top left
//     // so it matches the React Flow node anchor point (top left).
//     // eslint-disable-next-line no-param-reassign
//     node.position = {
//       x: nodeWithPosition.x - nodeWidth / 2,
//       y: nodeWithPosition.y - nodeHeight / 2,
//     };
//     return node;
//   });

//   return { nodes, edges };
// };

// const position = { x: 0, y: 0 };
// const edgeType = 'smoothstep';

// const nodeTypes = {
//   ResizableNodeSelected,
// };

// function Prev() {
//   const { prompt } = usePromptAnswer();
//   const [search] = useSearchParams();
//   const initialNodes = [];
//   const initialEdges = [];
//   const edgeSet = new Set<RoadmapEdge['id']>();
//   const [nodeState, setNodes, onNodesChange] = useNodesState(initialNodes);

//   const [edgeState, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   useEffect(() => {
//     if (getStoredRoadmap()) {
//       const { edges, nodes, viewport } = getStoredRoadmap();
//       setNodes(nodes);
//       setEdges(edges);

//       console.log(getStoredRoadmap());
//       return;
//     }
//     if (search) {
//       const { data } = prompt;
//       const dataCopy = [...data] as RoadmapNodes;
//       setNodes([...dataCopy]);

//       // eslint-disable-next-line array-callback-return
//       dataCopy.map((v) => {
//         initialNodes.push({
//           id: v?.id,
//           data: {
//             label: v?.content,
//           },
//           type: 'ResizableNodeSelected',
//           position,
//           style: {
//             background: '#fff',
//             border: '1px solid black',
//             borderRadius: 15,
//             fontSize: 12,
//           },
//         });
//         // source랑 target 구해서 간선id 만들고 이어주기
//         // parseInt는 오로지 숫자인 부분만 parse해줬음

//         if (v.id !== `${parseInt(v?.id, 10)}`) {
//           if (!edgeSet.has(`e${parseInt(v?.id, 10)}${v?.id}`)) {
//             initialEdges.push({
//               id: `e${parseInt(v?.id, 10)}${v?.id}`,
//               source: `${parseInt(v?.id, 10)}`,
//               target: v.id,
//               type: edgeType,
//               animated: true,
//             });
//           }
//           edgeSet.add(`e${parseInt(v?.id, 10)}${v?.id}`);
//         }
//       });
//       search.size !== 0 ? setNodes(initialNodes) : setNodes([]);
//       search.size !== 0 ? setEdges(initialEdges) : setEdges([]);
//       // if (search.size !== 0) {
//       //   onLayout('TB');
//       // }
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   const [rfInstance, setRfInstance] = useState(null);
//   const { setViewport } = useReactFlow();
//   const onConnect = useCallback(
//     (params) => {
//       setEdges((els) => addEdge(params, els));
//     },
//     [setEdges],
//   );

//   const onClickItem = useCallback((e) => {
//     console.log('onClickNode', e);
//     console.log('onClickItem', e.target);
//     onSave();
//   }, []);

//   const onLayout = useCallback(
//     (direction) => {
//       const { nodes: layoutedNodes, edges: layoutedEdges } =
//         getLayoutedElements(nodeState, edgeState, direction);

//       setNodes([...layoutedNodes]);
//       setEdges([...layoutedEdges]);
//     },
//     [nodeState, edgeState, setEdges, setNodes],
//   );

//   const onAddNode = useCallback(() => {
//     const nodeCount: number = [...nodeState].length;
//     // console.log(
//     //   'onAddNode',
//     //   editor?.props?.editor?.contentComponent?.editorContentRef?.current,
//     // );
//     setNodes([
//       ...nodeState,
//       {
//         // TODO : 노드id 는 '1a' 형식이다. 자식 노드면 '1a'지만 '1'의 형제 노드면 '2'가 된다
//         // label에 들어가는 데이터가 에러를 발생시키는 걸 해결하자.
//         id: (nodeCount + 1).toString(),
//         data: {
//           label: `${label}`,
//           // label: '',
//         },
//         type: 'ResizableNodeSelected',
//         position,

//         style: {
//           background: '#fff',
//           border: '1px solid black',
//           borderRadius: 15,
//           fontSize: 12,
//         },
//       },
//     ]);
//   }, [nodeState, label, setNodes]);
//   const { postRoadmap } = useRoadmap();
//   const onPublishRoadmap = useCallback(() => {
//     // eslint-disable-next-line no-alert
//     // console.log(getStoredRoadmap());
//     const { edges, nodes, viewport } = getStoredRoadmap();
//     const data = {
//       roadmap: {
//         title: 'backend developer',
//         description:
//           '백엔드 개발자에 도전하고 싶은 사람들을 위한 맛보기 로드맵입니다.',
//         recommendedExecutionTimeValue: 0,
//         recommendedExecutionTimeUnit: '',
//       },
//       nodes,
//       edges,
//       viewport,
//     };
//     postRoadmap(data);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [nodeState, editor]);

//   const onRestore = useCallback(() => {
//     const restoreFlow = async () => {
//       const flow = JSON.parse(localStorage.getItem(flowKey));
//       const { data } = flow;
//       // eslint-disable-next-line no-console
//       console.log('restore', data);
//       // const nodeData = data?.nodes;
//       if (flow) {
//         const { x = 0, y = 0, zoom = 1 } = flow.viewport;
//         setNodes(flow.nodes || []);
//         setEdges(flow.edges || []);
//         setViewport({ x, y, zoom });
//       }
//     };

//     restoreFlow();
//   }, [setNodes, setViewport, setEdges]);

//   const onSave = useCallback(() => {
//     if (rfInstance) {
//       const flow = rfInstance.toObject();
//       localStorage.setItem(flowKey, JSON.stringify(flow));
//       setStoredRoadmap(flow);
//     }
//   }, [rfInstance]);

//   // 첫로딩 시의 포멧 => 노드랑 간선이 null이면 에러!~
//   // useEffect(() => {
//   //   onLayout('TB');
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);

//   useEffect(() => {
//     setNodes((nds) =>
//       nds.map((node) => {
//         if (node.id !== '2') {
//           return node;
//         }

//         return {
//           ...node,
//           data: {
//             ...node.data,
//           },
//         };
//       }),
//     );
//     // onLayout('TB');
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useMemo(() => {
//     if (edgeState && nodeState) {
//       return;
//     }
//     onLayout('TB');
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [edgeState, nodeState]);

//   const proOptions = { hideAttribution: true };
//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       <ReactFlow
//         nodes={nodeState}
//         edges={edgeState}
//         onClick={onClickItem}
//         onChange={onChangeLabel}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         fitView
//         // contentEditable
//         elevateNodesOnSelect
//         snapToGrid
//         proOptions={proOptions}
//         onInit={setRfInstance}
//         nodeTypes={nodeTypes}
//         minZoom={0.2}
//         maxZoom={4}
//         style={{
//           width: '100%',
//           height: '100%',
//           backgroundColor: '#ebf6fc',
//           opacity: '80%',
//         }}
//       >
//         <Panel position="top-right">
//           <button type="button" onClick={() => onLayout('TB')}>
//             vertical layout
//           </button>
//           <button type="button" onClick={() => onLayout('LR')}>
//             horizontal layout
//           </button>
//           <button type="button" onClick={() => onAddNode()}>
//             노드 추가
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               setNodes([]);
//               setEdges([]);
//             }}
//           >
//             노드 전체 삭제
//           </button>
//           <button type="button" onClick={onSave}>
//             save
//           </button>

//           <button type="button" onClick={onRestore}>
//             restore
//           </button>
//           <button type="button" onClick={() => onPublishRoadmap()}>
//             로드맵 발행
//           </button>
//         </Panel>
//         <Background gap={16} />
//         <Controls />
//         <MiniMap zoomable pannable />
//       </ReactFlow>
//     </div>
//   );
// }
// export default Prev;
