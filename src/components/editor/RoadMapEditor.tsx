/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line simple-import-sort/imports
import 'reactflow/dist/style.css';
import ResizableNodeSelected from './ResizableNodeSelected';
import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// eslint-disable-next-line import/no-extraneous-dependencies
import dagre from '@dagrejs/dagre';
import { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { styled } from 'styled-components';

import ColorSelectorNode from './ColorSelectorNode';

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

  useMemo(() => {
    console.log(nodes);
  }, [nodes]);
  const reactFlowStyle = {
    background: 'light-pink',
    width: '100%',
    height: 300,
  };

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
          background: 'red',
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
    <EditorWrap style={{ width: '100vw', height: '100vh' }}>
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
        style={reactFlowStyle}
        className="react-flow-node-resizer-example"
        minZoom={0.2}
        maxZoom={4}
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
        </Panel>
        <Background gap={16} />
        <Controls />
        <MiniMap zoomable pannable />
      </ReactFlow>
    </EditorWrap>
  );
}
export default RoadMapCanvas;
const EditorWrap = styled.div`
  & .react-flow__node {
    border: '1px solid pink';
  }
`;
