// /* eslint-disable react/no-danger */
// /* eslint-disable no-console */
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
// import ResizableNodeSelected from './ResizableNodeSelected';

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

//   // const nodeTypes = {
//   //   selectorNode: ColorSelectorNode,
//   // };

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
//   myCustomNode: ResizableNodeSelected,
//   // myCustomNode: CustomNode,
// };
// export default function RoadmapCanvas({ state, setState, ytext, ydoc }) {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
// const [rfInstance, setRfInstance] = useState(null);
// const { setViewport } = useReactFlow();
// // const nodeTypes = useMemo(
// //   () => ({
// //     myCustomNode: ResizableNodeSelected,
// //   }),
// //   [],
// // );

//   // useMemo(() => {
//   //   console.log('roadmapeditor props', editor);
//   //   setNodes([...nodes]);
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [editor]);
//   const onConnect = useCallback(
//     (params) => {
//       setEdges((els) => addEdge(params, els));
//     },
//     [setEdges],
//   );
//   // const onFocusInput = useCallback((params) => {
//   //   if (params?.target?.attributes[0]?.value.split(' ')[0] === 'true') {
//   //     // console.log(params?.target);
//   //   }
//   // }, []);
//   const onSave = useCallback(() => {
//     if (rfInstance) {
//       const flow = rfInstance.toObject();
//       console.log('onSave flow', flow);
//       localStorage.setItem(flowKey, JSON.stringify(flow));
//     }
//   }, [rfInstance]);

//   const onRestore = useCallback(() => {
//     const restoreFlow = async () => {
//       const flow = JSON.parse(localStorage.getItem(flowKey));
//       const { data } = flow;
//       const nodeData = data?.nodes;
//       // if (nodeData) {

//       // nodeData.map((v: addedNode) => console.log('v', v));
//       // }
//       console.log('nodeData', nodeData);
//       if (flow) {
//         const { x = 0, y = 0, zoom = 1 } = flow.viewport;
//         setNodes(flow.nodes || []);
//         setEdges(flow.edges || []);
//         setViewport({ x, y, zoom });
//       }
//     };

//     restoreFlow();
//   }, [setNodes, setViewport, setEdges]);

//   const onClickItem = useCallback((e) => {
//     console.log(e);
//   }, []);

//   const onLayout = useCallback(
//     (direction) => {
//       const { nodes: layoutedNodes, edges: layoutedEdges } =
//         getLayoutedElements(nodes, edges, direction);

//       setNodes([...layoutedNodes]);
//       setEdges([...layoutedEdges]);
//     },
//     [nodes, edges, setEdges, setNodes],
//   );

//   const onAddNode = useCallback(() => {
//     const nodeCount: number = [...nodes].length;
//     // console.log('onAdd editor state : ', editor);
//     setNodes([
//       ...nodes,
//       {
//         id: (nodeCount + 1).toString(),
//         data: {
//           // label: <div dangerouslySetInnerHTML={{ __html: editor }} />,
//           label: state,
//           // label: <div>?</div>,
//         },
//         type: 'myCustomNode',
//         position,
//         style: {
//           background: '#fff',
//           border: '1px solid black',
//           borderRadius: 15,
//           fontSize: 12,
//         },
//       },
//     ]);
//     console.log(nodes);
//   }, [nodes, state, setNodes]);

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
//     // };

//     setNodes([
//       {
//         id: '1',
//         type: 'ResizableNodeSelected',
//         position,
//         data: { label: 'test' },
//         style: {
//           background: '#fff',
//           border: '1px solid black',
//           borderRadius: 15,
//           fontSize: 12,
//         },
//       },
//       {
//         id: '2',
//         type: 'ResizableNodeSelected',
//         data: {
//           label: 'node1',
//         },
//         position,
//         style: {
//           background: '#fff',
//           border: '1px solid black',
//           borderRadius: 15,
//           fontSize: 12,
//         },
//       },
//     ]);

//     setEdges([
//       { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
//     ]);
//   }, [setEdges, setNodes]);

//   useMemo(() => {
//     if (edges && nodes) {
//       return;
//     }
//     onLayout('TB');
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [edges, nodes]);
//   return (
//     <ReactFlow
//       style={{
//         width: '100%',
//         height: '100%',
//         backgroundColor: '#ebf6fc',
//         opacity: '80%',
//       }}
//       nodes={nodes}
//       edges={edges}
//       onClick={onClickItem}
//       onNodesChange={onNodesChange}
//       onEdgesChange={onEdgesChange}
//       onConnect={onConnect}
//       nodeTypes={nodeTypes}
//       fitView
//       elevateNodesOnSelect
//       snapToGrid
//       className="react-flow-node-resizer-example"
//       minZoom={0.2}
//       maxZoom={4}
//       onInit={setRfInstance}
//     >
//       <Panel position="top-right">
//         <button type="button" onClick={() => onLayout('TB')}>
//           vertical layout
//         </button>
//         <button type="button" onClick={() => onLayout('LR')}>
//           horizontal layout
//         </button>
//         <button type="button" onClick={() => onAddNode()}>
//           노드 추가
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             setNodes([]);
//             setEdges([]);
//           }}
//         >
//           노드 전체 삭제
//         </button>
//         <button type="button" onClick={onSave}>
//           save
//         </button>
//         <button type="button" onClick={onRestore}>
//           restore
//         </button>
//       </Panel>
//       <Background gap={16} />
//       <Controls />
//       <MiniMap zoomable pannable />
//     </ReactFlow>
//   );
// }
// // const EditorWrap = styled.div`
// //   & .react-flow__node {
// //     border: '1px solid #cee6f3';
// //   }
// //   width: '100%',
// //         height: '100%',
// //         backgroundColor: '#ebf6fc',
// //         opacity: '80%',
// // `;

// // export default function RoadMapCanvas({ editor, setState, ydoc, ytext }) {
// //   return (
// //     <Roadmap editor={editor} setState={setState} ydoc={ydoc} ytext={ytext} />
// //   );
// // }
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line simple-import-sort/imports
import 'reactflow/dist/style.css';
import ResizableNodeSelected from './ResizableNodeSelected';
// eslint-disable-next-line import/no-extraneous-dependencies
import dagre from '@dagrejs/dagre';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';

import ColorSelectorNode from './ColorSelectorNode';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const flowKey = 'example-flow';

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const nodeTypes = {
    selectorNode: ColorSelectorNode,
  };

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    // eslint-disable-next-line no-param-reassign
    node.targetPosition = isHorizontal ? 'left' : 'top';
    // eslint-disable-next-line no-param-reassign
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';
    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    // eslint-disable-next-line no-param-reassign
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    return node;
  });

  return { nodes, edges };
};

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';
const nodeTypes = {
  ResizableNodeSelected,
};

function RoadMapCanvas({ editor, setState }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  useMemo(() => {
    console.log('roadmapeditor props', editor);
    setNodes([...nodes]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);
  const onConnect = useCallback(
    (params) => {
      setEdges((els) => addEdge(params, els));
    },
    [setEdges],
  );
  const onFocusInput = useCallback((params) => {
    if (params?.target?.attributes[0]?.value.split(' ')[0] === 'true') {
      // console.log(params?.target);
    }
  }, []);
  const onClickItem = useCallback((e) => {
    console.log(e);
  }, []);

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setEdges, setNodes],
  );

  const onAddNode = useCallback(() => {
    const nodeCount: number = [...nodes].length;
    setNodes([
      ...nodes,
      {
        id: (nodeCount + 1).toString(),
        data: {
          label: <div dangerouslySetInnerHTML={{ __html: editor }} />,
        },
        type: 'ResizableNodeSelected',
        position,
        style: {
          background: '#fff',
          border: '1px solid black',
          borderRadius: 15,
          fontSize: 12,
        },
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, editor]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      const { data } = flow;
      const nodeData = data?.nodes;
      // if (nodeData) {

      // nodeData.map((v: addedNode) => console.log('v', v));
      // }
      console.log('nodeData', nodeData);
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport, setEdges]);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log('onSave flow', flow);
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  useMemo(() => {
    console.log(nodes);
  }, [nodes]);

  // 첫로딩 시의 포멧 => 노드랑 간선이 null이면 에러!~
  // useEffect(() => {
  //   onLayout('TB');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id !== '2') {
          return node;
        }

        return {
          ...node,
          data: {
            ...node.data,
          },
        };
      }),
    );
    // };

    setNodes([
      {
        id: '1',
        type: 'ResizableNodeSelected',
        position,
        data: { label: editor || <div>empty node</div> },
        style: {
          background: '#fff',
          border: '1px solid black',
          borderRadius: 15,
          fontSize: 12,
        },
      },
      {
        id: '2',
        type: 'ResizableNodeSelected',
        data: {
          label: editor || <div>empty node</div>,
        },
        position,
        style: {
          // background: 'red',
          background: '#ebf6fc',
          border: '1px solid black',
          borderRadius: 15,
          fontSize: 12,
        },
      },
    ]);

    setEdges([
      { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    if (edges && nodes) {
      return;
    }
    onLayout('TB');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edges, nodes]);
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onClick={onClickItem}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        elevateNodesOnSelect
        snapToGrid
        nodeTypes={nodeTypes}
        // style={reactFlowStyle}
        minZoom={0.2}
        maxZoom={4}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#ebf6fc',
          opacity: '80%',
        }}
      >
        <Panel position="top-right">
          <button type="button" onClick={() => onLayout('TB')}>
            vertical layout
          </button>
          <button type="button" onClick={() => onLayout('LR')}>
            horizontal layout
          </button>
          <button type="button" onClick={() => onAddNode()}>
            노드 추가
          </button>
          <button
            type="button"
            onClick={() => {
              setNodes([]);
              setEdges([]);
            }}
          >
            노드 전체 삭제
          </button>
          <button type="button" onClick={onSave}>
            save
          </button>

          <button type="button" onClick={onRestore}>
            restore
          </button>
        </Panel>
        <Background gap={16} />
        <Controls />
        <MiniMap zoomable pannable />
      </ReactFlow>
    </div>
  );
}
export default RoadMapCanvas;
