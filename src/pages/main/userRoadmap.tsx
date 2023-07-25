/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Position,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import { styled } from 'styled-components';

import { flowKey } from '../../axiosInstance/constants';
// import { useInput } from '../../components/common/hooks/useInput';
// import { useRoadmap } from '../../components/common/hooks/useRoadmapEditor';
import CustomNode from './customNode';
import MultiSelectionToolbar from './multiSelectionToolbar';

const defaultNodeStyle = {
  border: '2px solid gray',
  background: 'white',
  borderRadius: 20,
};

export const initialNodes = [
  {
    id: 'interaction-1',
    type: 'custom',
    data: { label: 'Node 1', toolbarPosition: Position.Top },
    position: { x: 250, y: 5 },
    style: defaultNodeStyle,
  },
  {
    id: 'interaction-2',
    type: 'custom',
    data: { label: 'Node 2', toolbarPosition: Position.Top },
    position: { x: 100, y: 100 },
    style: defaultNodeStyle,
  },
  {
    id: 'interaction-3',
    type: 'custom',
    data: { label: 'Node 3', toolbarPosition: Position.Top },
    position: { x: 400, y: 100 },
    style: defaultNodeStyle,
  },
  {
    id: 'interaction-4',
    type: 'custom',
    data: { label: 'Node 4', toolbarPosition: Position.Top },
    position: { x: 400, y: 200 },
    style: defaultNodeStyle,
  },
];

export const initialEdges = [
  {
    id: 'interaction-e1-2',
    source: 'interaction-1',
    target: 'interaction-2',
    animated: true,
  },
];

const nodeTypes = {
  custom: CustomNode,
};

function UserRoadmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { setViewport } = useReactFlow();
  // const roadmap = useRoadmap();
  // const [title, onChangeTitle] = useInput('');
  // const [desc, onChangeDesc] = useInput('');

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [setEdges],
  );

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flowStr = localStorage.getItem(flowKey);
      if (flowStr) {
        const flow = JSON.parse(flowStr);
        const {
          x = 0,
          y = 0,
          zoom = 1,
          nodes: restoredNodes,
          edges: restoredEdges,
        } = flow;
        setNodes(restoredNodes || []);
        setEdges(restoredEdges || []);
        setViewport({ x, y, zoom });
        console.log(flowStr);
      }
    };

    restoreFlow();
    // roadmap.getRoadmap(title, desc, flowKey);
  }, [setNodes, setEdges, setViewport]);

  useEffect(() => {
    onRestore();
  }, [onRestore]);

  const [isSelectable] = useState(true);
  const [isDraggable] = useState(false);
  const [isConnectable] = useState(false);
  const [zoomOnScroll] = useState(true); // zoom in zoom out
  const [panOnScroll] = useState(false); // 위아래 스크롤
  const [zoomOnDoubleClick] = useState(false);
  const [panOnDrag] = useState(true); // 마우스로 이동

  return (
    <EditorWrap style={{ width: '64vw', height: '75vh' }}>
      <ReactFlow
        className="react-flow-node-toolbar-example"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        elementsSelectable={isSelectable}
        nodesConnectable={isConnectable}
        nodesDraggable={isDraggable}
        zoomOnScroll={zoomOnScroll}
        panOnScroll={panOnScroll}
        zoomOnDoubleClick={zoomOnDoubleClick}
        onConnect={onConnect}
        panOnDrag={panOnDrag}
        fitView
        attributionPosition="top-right"

        // onClick={nodes ? open : undefined}
      >
        <MiniMap />
        <Controls />
        <Background gap={16} />
        <Controls />
        <MiniMap zoomable pannable />
        <MultiSelectionToolbar />
      </ReactFlow>
    </EditorWrap>
  );
}

export default function InteractionFlow() {
  return (
    <ReactFlowProvider>
      <UserRoadmap />
    </ReactFlowProvider>
  );
}

//   return (
//     <ReactFlow
//       nodes={nodes}
//       edges={edges}
//       onNodesChange={onNodesChange}
//       onEdgesChange={onEdgesChange}
//       elementsSelectable={isSelectable}
//       nodesConnectable={isConnectable}
//       nodesDraggable={isDraggable}
//       zoomOnScroll={zoomOnScroll}
//       panOnScroll={panOnScroll}
//       zoomOnDoubleClick={zoomOnDoubleClick}
//       onConnect={onConnect}
//       onNodeClick={captureElementClick ? onNodeClick : undefined}
//       onNodeDragStart={onNodeDragStart}
//       onNodeDragStop={onNodeDragStop}
//       panOnDrag={panOnDrag}
//       onPaneClick={captureZoomClick ? onPaneClick : undefined}
//       onPaneScroll={captureZoomScroll ? onPaneScroll : undefined}
//       onPaneContextMenu={captureZoomClick ? onPaneContextMenu : undefined}
//       fitView
//       attributionPosition="top-right"
//     >
//       <MiniMap />
//       <Controls />

// //       <Panel position="top-left">
// //         <div>
// //           <label htmlFor="draggable">
// //             <input
//               id="draggable"
//               type="checkbox"
//               checked={isDraggable}
//               onChange={(event) => setIsDraggable(event.target.checked)}
//               className="react-flow__draggable"
//             />
//             nodesDraggable
//           </label>
//         </div>
//         <div>
//           <label htmlFor="connectable">
//             <input
//               id="connectable"
//               type="checkbox"
//               checked={isConnectable}
//               onChange={(event) => setIsConnectable(event.target.checked)}
//               className="react-flow__connectable"
//             />
//             nodesConnectable
//           </label>
//         </div>
//         <div>
//           <label htmlFor="selectable">
//             <input
//               id="selectable"
//               type="checkbox"
//               checked={isSelectable}
//               onChange={(event) => setIsSelectable(event.target.checked)}
//               className="react-flow__selectable"
//             />
//             elementsSelectable
//           </label>
//         </div>
//         <div>
//           <label htmlFor="zoomonscroll">
//             <input
//               id="zoomonscroll"
//               type="checkbox"
//               checked={zoomOnScroll}
//               onChange={(event) => setZoomOnScroll(event.target.checked)}
//               className="react-flow__zoomonscroll"
//             />
//             zoomOnScroll
//           </label>
//         </div>
//         <div>
//           <label htmlFor="panonscroll">
//             <input
//               id="panonscroll"
//               type="checkbox"
//               checked={panOnScroll}
//               onChange={(event) => setPanOnScroll(event.target.checked)}
//               className="react-flow__panonscroll"
//             />
//             panOnScroll
//           </label>
//         </div>
//         <div>
//           <label htmlFor="zoomondbl">
//             <input
//               id="zoomondbl"
//               type="checkbox"
//               checked={zoomOnDoubleClick}
//               onChange={(event) => setZoomOnDoubleClick(event.target.checked)}
//               className="react-flow__zoomondbl"
//             />
//             zoomOnDoubleClick
//           </label>
//         </div>
//         <div>
//           <label htmlFor="panOnDrag">
//             <input
//               id="panOnDrag"
//               type="checkbox"
//               checked={panOnDrag}
//               onChange={(event) => setpanOnDrag(event.target.checked)}
//               className="react-flow__panOnDrag"
//             />
//             panOnDrag
//           </label>
//         </div>
//         <div>
//           <label htmlFor="capturezoompaneclick">
//             <input
//               id="capturezoompaneclick"
//               type="checkbox"
//               checked={captureZoomClick}
//               onChange={(event) => setCaptureZoomClick(event.target.checked)}
//               className="react-flow__capturezoompaneclick"
//             />
//             capture onPaneClick
//           </label>
//         </div>
//         <div>
//           <label htmlFor="capturezoompanescroll">
//             <input
//               id="capturezoompanescroll"
//               type="checkbox"
//               checked={captureZoomScroll}
//               onChange={(event) => setCaptureZoomScroll(event.target.checked)}
//               className="react-flow__capturezoompanescroll"
//             />
//             capture onPaneScroll
//           </label>
//         </div>
//         <div>
//           <label htmlFor="captureelementclick">
//             <input
//               id="captureelementclick"
//               type="checkbox"
//               checked={captureElementClick}
//               onChange={(event) => setCaptureElementClick(event.target.checked)}
//               className="react-flow__captureelementclick"
//             />
//             capture onElementClick
//           </label>
//         </div>
//       </Panel>
//     </ReactFlow>
// )};

const EditorWrap = styled.div`
  & .react-flow__node {
    border: '1px solid pink';
  }
`;
