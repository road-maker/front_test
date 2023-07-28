/* eslint-disable simple-import-sort/imports */
// import { modals } from '@mantine/modals';
import { Button, Center, Modal } from '@mantine/core';
import { EditorContent } from '@tiptap/react';
import { useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { styled } from 'styled-components';

const edgeType = 'smoothstep';
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    data: { label: 'node 2' },
    position: { x: 100, y: 100 },
  },
  {
    id: '2a',
    data: { label: 'node 2a' },
    position: { x: 200, y: 200 },
  },
  {
    id: '2b',
    data: { label: 'node 2b' },
    position: { x: 300, y: 300 },
  },
  {
    id: '2c',
    data: { label: 'node 2c' },
    position: { x: 400, y: 100 },
  },
];

const initialEdges = [
  { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
  { id: 'e13', source: '1', target: '3', type: edgeType, animated: true },
  { id: 'e22a', source: '2', target: '2a', type: edgeType, animated: true },
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
  currentRoadmap,
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodeState, setNodes, onNodesChange] = useNodesState(
    // currentRoadmap.nodes,
    [],
  );
  const [edgeState, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSelectable] = useState(true);
  const [isDraggable] = useState(false);
  const [isConnectable] = useState(false);
  const [zoomOnScroll] = useState(true); // zoom in zoom out
  const [panOnScroll] = useState(false); // 위아래 스크롤
  const [zoomOnDoubleClick] = useState(false);
  const [panOnDrag] = useState(true); // 마우스로 이동
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if ('currentRoadmap' in currentRoadmap) {
      setNodes(currentRoadmap.currentRoadmap.nodes);
      setEdges(currentRoadmap.currentRoadmap.edges);
    }
    console.log(currentRoadmap.currentRoadmap);
    console.log(nodeState);
    console.log(edgeState);
  }, []);

  // const onConnect = useCallback(
  //   (params) => {
  //     setEdges((els) => addEdge(params, els));
  //   },
  //   [setEdges],
  // );
  const proOptions = { hideAttribution: true };
  // const [opened, { open, close }] = useDisclosure(false);

  // useEffect(() => {
  //   console.log('postNodes', postNodes);
  //   if ('postNodes' in postNodes) {
  //     setNodes(postNodes.postNodes);
  //   }
  //   if ('postEdges' in postNodes) {
  //     setEdges(postNodes.postEdges);
  //   }
  // }, [postNodes]);

  return (
    <Wrap style={{ height: '70vh' }}>
      <ReactFlow
        nodes={nodeState}
        edges={edgeState}
        proOptions={proOptions}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        elementsSelectable={isSelectable}
        nodesConnectable={isConnectable}
        nodesDraggable={isDraggable}
        zoomOnScroll={zoomOnScroll}
        panOnScroll={panOnScroll}
        zoomOnDoubleClick={zoomOnDoubleClick}
        // onConnect={onConnect}
        panOnDrag={panOnDrag}
        attributionPosition="top-right"
        minZoom={0.2}
        maxZoom={4}
        onNodeClick={(e, n) => {
          setLabel(`${n?.data?.label}`);
          setId(`${n?.id}`);
          setIsOpen(!isOpen);
        }}
        fitView
        style={{
          backgroundColor: '#ebf6fc',
        }}
      >
        <Background gap={16} />
        <Controls />
        <MiniMap zoomable pannable />
      </ReactFlow>
      <Modal opened={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <Center>
          <EditorContent editor={editor} readOnly />
        </Center>
        <Center>
          <Button mt={30} onClick={() => setIsOpen(!isOpen)} variant="light">
            닫기
          </Button>
        </Center>
      </Modal>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 60vh;
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
  currentRoadmap,
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
        currentRoadmap={currentRoadmap}
        // postNodes={postNodes}
        // postEdges={postEdges}
        // postViewport={postViewport}
      />
    </ReactFlowProvider>
  );
}
