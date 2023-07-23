/* eslint-disable no-console */
/* eslint-disable react/no-danger */
/* eslint-disable simple-import-sort/imports */
import 'reactflow/dist/style.css';

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

import { usePromptAnswer } from 'components/prompts/hooks/usePromptResponse';
import { useSearchParams } from 'react-router-dom';
import ResizableNodeSelected from './ResizableNodeSelected';
import { RoadmapNodes } from './types';

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

function RoadMapCanvas({ editor, setState, onChange }) {
  const { prompt } = usePromptAnswer();
  const [search] = useSearchParams();
  const initialNodes = [];
  const initialEdges = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  useEffect(() => {
    if (search) {
      const { data } = prompt;
      const dataCopy = [...data] as RoadmapNodes;
      setNodes([...dataCopy]);

      // eslint-disable-next-line array-callback-return
      dataCopy.map((v) => {
        initialNodes.push({
          id: v?.id,
          data: {
            label: v?.content,
          },
          type: 'ResizableNodeSelected',
          position,
          style: {
            background: '#fff',
            border: '1px solid black',
            borderRadius: 15,
            fontSize: 12,
          },
        });
        // source랑 target 구해서 간선id 만들고 이어주기
        // parseInt는 오로지 숫자인 부분만 parse해줬음

        if (v.id !== `${parseInt(v?.id, 10)}`) {
          initialEdges.push({
            id: `e${parseInt(v?.id, 10)}${v?.id}`,
            source: `${parseInt(v?.id, 10)}`,
            target: v.id,
            type: edgeType,
            animated: true,
          });
        }
      });
      console.log('search', search);
      search ? setNodes(initialNodes) : setNodes([]);
      search ? setEdges(initialEdges) : setEdges([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  useMemo(() => {
    setNodes([...nodes]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);
  const onConnect = useCallback(
    (params) => {
      setEdges((els) => addEdge(params, els));
    },
    [setEdges],
  );

  // const onClickItem = useCallback((e) => {
  //   console.log(e);
  // }, []);

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
    console.log(
      'onAddNode',
      editor?.props?.editor?.contentComponent?.editorContentRef?.current,
    );
    setNodes([
      ...nodes,
      {
        // TODO : 노드id 는 '1a' 형식이다. 자식 노드면 '1a'지만 '1'의 형제 노드면 '2'가 된다
        id: (nodeCount + 1).toString(),
        data: {
          // label: <div dangerouslySetInnerHTML={{ __html: editor }} />,
          // label: ,
          label: 'testing..',
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
  }, [nodes, editor, setNodes]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      const { data } = flow;
      // eslint-disable-next-line no-console
      console.log('restore', data);
      // const nodeData = data?.nodes;
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
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

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
    // onLayout('TB');
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
        // onClick={onClickItem}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        elevateNodesOnSelect
        snapToGrid
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
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
