/* eslint-disable no-alert */
/* eslint-disable react/no-danger */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line simple-import-sort/imports
import 'reactflow/dist/style.css';
// import CustomNode from '../../pages/main/customNode';
import { axiosInstance } from '../../axiosInstance';
// eslint-disable-next-line import/no-extraneous-dependencies
import dagre from '@dagrejs/dagre';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
} from 'reactflow';
import { styled } from 'styled-components';
import { usePatchUser } from 'components/common/hooks/usePatchUser';
import { TextInput } from '@mantine/core';

import { flowKey } from '../../axiosInstance/constants';
import { useRoadmap } from '../common/hooks/useRoadmapEditor';
import { useInput } from '../common/hooks/useInput';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

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
// const nodeTypes = {
//   custom: CustomNode,
// };

function Roadmap({ editor, setState }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const roadmap = useRoadmap();
  const [title, onChangeTitle, setTitle] = useInput('');
  const [desc, onChangeDesc, setDesc] = useInput('');

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

  const onSave = useCallback(async () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
    // roadmap.saveRoadmap(title, desc, flowKey);
  }, [rfInstance]);

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
    roadmap.getRoadmap(title, desc, flowKey);
  }, [roadmap, title, desc, setNodes, setEdges, setViewport]);

  // useEffect(() => {
  //   onRestore();
  // }, [onRestore]);

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
        type: 'custom',
        position,
        style: {
          background: '#fff',
          border: '1px solid black',
          borderRadius: 15,
          fontSize: 12,
        },
      },
    ]);
  }, [nodes, setNodes, editor]);

  const reactFlowStyle = {
    background: 'light-pink',
    width: '100%',
    height: 300,
  };

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

    setNodes([
      {
        id: '1',
        type: 'custom',
        position,
        data: { label: 'test' },
        style: {
          background: '#fff',
          border: '1px solid black',
          borderRadius: 15,
          fontSize: 12,
        },
      },
      {
        id: '2',
        type: 'custom',
        data: {
          label: 'node1',
        },
        position,
        style: {
          background: '#fff',
          border: '1px solid black',
          borderRadius: 15,
          fontSize: 12,
        },
      },
      {
        id: '2a',
        type: 'custom',
        data: { label: 'test' },
        position,
        style: {
          background: '#fff',
          border: '1px solid black',
          borderRadius: 15,
          fontSize: 12,
        },
      },
      {
        id: '2b',
        type: 'custom',
        data: { label: 'node 2b' },
        position,
        style: {
          background: '#fff',
          border: '1px solid black',
          borderRadius: 15,
          fontSize: 12,
        },
      },
      {
        id: '2d',
        type: 'custom',
        data: { label: 'node 2d' },
        position,
        className: 'circle',
        style: {
          background: 'purple',
          border: '1px solid black',
          borderRadius: '100%',
          padding: '2rem',
          fontSize: 12,
        },
      },
      {
        id: '3',
        type: 'custom',
        data: { label: 'node 3' },
        position,
        style: {
          background: '#fff',
          border: '1px solid black',
          borderRadius: 15,
          fontSize: 12,
        },
      },
    ]);

    setEdges([
      { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
    ]);
  }, [setEdges, setNodes]);

  useMemo(() => {
    if (edges && nodes) {
      return;
    }
    onLayout('TB');
  }, [edges, nodes, onLayout]);
  return (
    <EditorWrap style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        elevateNodesOnSelect
        snapToGrid
        // nodeTypes={nodeTypes}
        style={reactFlowStyle}
        className="react-flow-node-resizer-example"
        minZoom={0.2}
        maxZoom={4}
        onInit={setRfInstance}
      >
        <Panel position="top-center">
          <TextInput
            placeholder="제목을 입력해주세요"
            onChange={onChangeTitle}
          />
          <TextInput
            placeholder="설명을 입력해주세요"
            onChange={onChangeDesc}
          />
        </Panel>
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
          <button onClick={onSave}>save</button>
        </Panel>
        <Background gap={16} />
        <Controls />
        <MiniMap zoomable pannable />
      </ReactFlow>
    </EditorWrap>
  );
}
const EditorWrap = styled.div`
  & .react-flow__node {
    border: '1px solid pink';
  }
`;

export default function RoadMapCanvas({ editor, setState }) {
  return (
    <ReactFlowProvider>
      <Roadmap editor={editor} setState={setState} />
    </ReactFlowProvider>
  );
}
