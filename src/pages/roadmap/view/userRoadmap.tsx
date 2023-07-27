import 'reactflow/dist/style.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { styled } from 'styled-components';

const edgeType = 'smoothstep';

const initialNodes = [
  {
    id: '1',
    data: { label: 'test' },
    position: { x: 100, y: 100 },
    // type: 'custom',
    style: {
      background: '#fff',
      border: '1px solid black',
      borderRadius: 15,
      fontSize: 12,
    },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 200 },
    // type: 'custom',
    style: {
      background: '#fff',
      border: '1px solid black',
      borderRadius: 15,
      fontSize: 12,
    },
  },
];

const initialEdges = [
  { id: 'e11a', source: '1', target: '1a', type: edgeType },
];
function Roadmap({
  editor,
  label,
  onChangeLabel,
  setLabel,
  id,
  setState,
  state,
  onChangeId,
  setId,
}) {
  const [nodeState, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edgeState, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSelectable] = useState(true);
  const [isDraggable] = useState(false);
  const [isConnectable] = useState(false);
  const [zoomOnScroll] = useState(true); // zoom in zoom out
  const [panOnScroll] = useState(false); // 위아래 스크롤
  const [zoomOnDoubleClick] = useState(false);
  const [panOnDrag] = useState(true); // 마우스로 이동

  const onConnect = useCallback(
    (params) => {
      setEdges((els) => addEdge(params, els));
    },
    [setEdges],
  );
  return (
    <Wrap>
      <ReactFlow
        nodes={nodeState}
        edges={edgeState}
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
        attributionPosition="top-right"
        minZoom={0.2}
        maxZoom={4}
        onNodeClick={(e, n) => {
          setLabel(`${n?.data?.label}`);
          setId(`${n?.id}`);
        }}
        fitView
      >
        <Background gap={16} />
        <Controls />
        <MiniMap zoomable pannable />
      </ReactFlow>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  & .updatenode__controls {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 4;
    font-size: 12px;
  }

  & .updatenode__controls label {
    display: block;
  }

  & .updatenode__bglabel {
    margin-top: 10px;
  }

  & .updatenode__checkboxwrapper {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
`;
export default function InteractionFlow({
  editor,
  label,
  onChangeLabel,
  setLabel,
  id,
  setState,
  state,
  onChangeId,
  setId,
}) {
  return (
    <ReactFlowProvider>
      <Roadmap
        editor={editor}
        setState={setState}
        label={label}
        onChangeLabel={onChangeLabel}
        setLabel={setLabel}
        state={state}
        onChangeId={onChangeId}
        id={id}
        setId={setId}
      />
    </ReactFlowProvider>
  );
}
