// eslint-disable-next-line simple-import-sort/imports
import 'reactflow/dist/style.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import dagre from '@dagrejs/dagre';
import { TextInput } from '@mantine/core';
import { usePromptAnswer } from 'components/prompts/hooks/usePromptResponse';
import { useRoadmap } from 'components/roadmaps/hooks/useRoadmap';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import { getStoredRoadmap, setStoredRoadmap } from 'storage/roadmap-storage';
import { styled } from 'styled-components';

import { useInput } from '../common/hooks/useInput';
import { RoadmapEdge, RoadmapNode } from './types';

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
// const nodeTypes = {
//  ResizableNodeSelected,
//   custom: CustomNode,
// };

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
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

function Roadmap({
  editor,
  label,
  roadMapTitle,
  onRoadMapTitleChange,
  setRoadMapTitle,
  onChangeLabel,
  setLabel,
  id,
  setState,
  state,
  onChangeId,
  setId,
}) {
  const { prompt } = usePromptAnswer();
  const [search] = useSearchParams();

  const edgeSet = new Set<RoadmapEdge['id']>();
  const nodeSet = new Set<RoadmapNode['id']>();
  const [nodeState, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edgeState, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const roadmap = useRoadmap();
  const [title, onChangeTitle, setTitle] = useInput('');
  const [desc, onChangeDesc, setDesc] = useInput('');

  const [nodeBg, setNodeBg] = useState('#eee');
  const [nodeHidden, setNodeHidden] = useState(false);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const proOptions = { hideAttribution: true };
  useEffect(() => {
    // if (getStoredRoadmap()) {
    // const { edges, nodes, viewport } = getStoredRoadmap();
    // setNodes(nodes);
    //   setEdges(edges);
    //   setViewport(viewport);

    //   return;
    // }
    // console.log(search.get('title'));

    if (prompt) {
      // if (prompt && search.size > 0 && prompt.keyword === search.get('title')) {
      // gpt 자동생성
      const { data } = prompt;
      const dataCopy = [...data];
      setNodes([]);
      setEdges([]);

      // eslint-disable-next-line array-callback-return
      dataCopy.map((v) => {
        if (!nodeSet.has(v?.id)) {
          initialNodes.push({
            id: v?.id,
            data: {
              label: v?.content,
            },
            // type: 'custom',
            position,
            style: {
              background: '#fff',
              border: '1px solid black',
              borderRadius: 15,
              fontSize: 12,
            },
          });
          nodeSet.add(`${v?.id}`);
        }

        // source랑 target 구해서 간선id 만들고 이어주기
        // parseInt는 오로지 숫자인 부분만 parse해줬음

        if (v.id !== `${parseInt(v?.id, 10)}`) {
          if (!edgeSet.has(`e${parseInt(v?.id, 10)}${v?.id}`)) {
            initialEdges.push({
              id: `e${parseInt(v?.id, 10)}${v?.id}`,
              source: `${parseInt(v?.id, 10)}`,
              target: v.id,
              type: edgeType,
              // animated: true,
            });
          }
          edgeSet.add(`e${parseInt(v?.id, 10)}${v?.id}`);
        }
      });
      search.size !== 0 ? setNodes(initialNodes) : setNodes([]);
      search.size !== 0 ? setEdges(initialEdges) : setEdges([]);
      if (search.size !== 0) {
        // onLayout('TB');
        onLayout('LR');
      }

      // setNodes((nds) =>
      //   nds.map((node) => {
      //     // if (node.id === '1') {
      //     if (node.id === id) {
      //       // it's important that you create a new object here
      //       // in order to notify react flow about the change
      //       // eslint-disable-next-line no-param-reassign
      //       node.data = {
      //         ...node.data,
      //         // label: nodeName,
      //         label,
      //       };
      //     }
      //     console.log('요놈이 무한 출력?', node); // 요놈이 무한 출력?

      //     return node;
      //   }),
      // );
    }
    // }, [nodeName, prompt, search]);
    // }, [edgeSet, id, label, nodeSet, prompt, search, setEdges, setNodes]);
  }, []);

  useMemo(() => {
    setNodes((nds) =>
      nds.map((node) => {
        // if (node.id === '1') {
        if (node.id === id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          // eslint-disable-next-line no-param-reassign
          node.data = {
            ...node.data,
            label,
          };
        }
        console.log(node);

        return node;
      }),
    );
    // }, [label, id]);
  }, [label, id]);
  // useMemo(() => {
  //   setNodes((nds) =>
  //     nds.map((node) => {
  //       // if (node.id === '1') {
  //       if (node.id === id) {
  //         // it's important that you create a new object here
  //         // in order to notify react flow about the change
  //         // eslint-disable-next-line no-param-reassign
  //         node.data = {
  //           ...node.data,
  //           label: nodeName,
  //         };
  //       }
  //       console.log(node);

  //       return node;
  //     }),
  //   );
  // }, [label, nodeName]);

  useMemo(() => {
    console.log('roadmapeditor props', editor);
    setNodes([...nodeState]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const onConnect = useCallback(
    (params) => {
      setEdges((els) => addEdge(params, els));
    },
    [setEdges],
  );

  // const onSave = useCallback(() => {
  //   if (rfInstance) {
  //     const flow = rfInstance.toObject();
  //     localStorage.setItem(flowKey, JSON.stringify(flow));
  //     console.log(flow);
  //   }
  // }, [rfInstance]);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      setStoredRoadmap(flow);
    }
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
        // console.log(flowStr);
      }
    };

    restoreFlow();
    // roadmap.getRoadmap(title, desc, flowKey);
  }, [setNodes, setEdges, setViewport]);
  // const onClickItem = useCallback((e) => {
  //   console.log(e);
  // }, []);

  // const onLayout = useCallback(
  //   (direction) => {
  //     const { nodes: layoutedNodes, edges: layoutedEdges } =
  //       getLayoutedElements(nodes, edges, direction);

  //     setNodes([...layoutedNodes]);
  //     setEdges([...layoutedEdges]);
  //   },
  //   [nodes, edges, setEdges, setNodes],
  // );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodeState, edgeState, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodeState, edgeState, setEdges, setNodes],
  );

  const onAddNode = useCallback(() => {
    const nodeCount: number = [...nodeState]?.length;
    setNodes([
      ...nodeState,
      {
        // TODO : 노드id 는 '1a' 형식이다. 자식 노드면 '1a'지만 '1'의 형제 노드면 '2'가 된다
        // label에 들어가는 데이터가 에러를 발생시키는 걸 해결하자.
        id: (nodeCount + 1).toString(),
        data: {
          label: ``,
          // label: '',
        },
        // type: 'custom',
        position,
        style: {
          background: '#fff',
          border: '1px solid black',
          borderRadius: 15,
          fontSize: 12,
        },
      },
    ]);
  }, [nodeState, setNodes]);

  const { postRoadmap } = useRoadmap();

  const onPublishRoadmap = useCallback(() => {
    const { edges, nodes, viewport } = getStoredRoadmap();

    const nodesCopy = [...nodes];
    nodesCopy.map((v) => {
      state.map((item) => {
        if (v.id === item.id) {
          console.log('onPublish', item.details);
          // eslint-disable-next-line no-param-reassign
          v.detailedContent = item.details;
        }
      });
    });

    const data = {
      roadmap: {
        title: roadMapTitle,
        // title: '',
        description:
          '개발자에 도전하고 싶은 사람들을 위한 맛보기 로드맵입니다.',
        thumbnailUrl: '',
        recommendedExecutionTimeValue: 0,
        recommendedExecutionTimeUnit: '',
      },
      nodes: nodesCopy,
      edges,
      viewport: defaultViewport,
    };
    postRoadmap(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeState]);

  // const { deleteElements } = useReactFlow();
  const useRemoveNode = useCallback(() => {
    setNodes((nds) => nds.filter((node) => node.id !== label));
  }, [label]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          // eslint-disable-next-line no-param-reassign
          node.style = { ...node.style, backgroundColor: nodeBg };
        }

        return node;
      }),
    );
    // };
  }, [nodeState, nodeBg, id]);

  useMemo(() => {
    if (edgeState && nodeState) {
      return;
    }
    onLayout('TB');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edgeState, nodeState]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          // when you update a simple type you can just update the value
          // eslint-disable-next-line no-param-reassign
          node.hidden = nodeHidden;
        }
        return node;
      }),
    );
    setNodes((nds) =>
      nds.map((node) => {
        // if (node.id === '1') {
        if (node.id === label) {
          // when you update a simple type you can just update the value
          // eslint-disable-next-line no-param-reassign
          // node.data.label = label;
          console.log(node.data.label);
        }
        return node;
      }),
    );
  }, [nodeState, edgeState]);
  // }, [nodeState, edgeState, setNodes, id, nodeHidden, label]);
  // setEdges((eds) =>
  //   eds.map((edge) => {
  //     // if (edge.id === 'e1-2') {
  //     if (edge.id === 'e11a') {
  //       // console.log(edge);
  //       // if (parseInt(edge.id, 10) === label) {
  //       // eslint-disable-next-line no-param-reassign
  //       edge.hidden = nodeHidden;
  //     }

  //     return edge;
  //   }),
  // );
  return (
    <Wrap>
      <ReactFlow
        nodes={nodeState}
        edges={edgeState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultViewport={defaultViewport}
        minZoom={0.2}
        maxZoom={4}
        onConnect={onConnect}
        onNodeClick={(e, n) => {
          setLabel(`${n?.data?.label}`);
          setId(`${n?.id}`);
        }}
        attributionPosition="bottom-left"
        fitView
        zoomOnDoubleClick
        elevateNodesOnSelect
        snapToGrid
        proOptions={proOptions}
        onInit={setRfInstance}
        // nodeTypes={nodeTypes}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#ebf6fc',
          opacity: '80%',
        }}
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
          <div className="updatenode__controls">
            <div>label:</div>
            <input
              value={label}
              onChange={(evt) => {
                setLabel(evt.target.value);
              }}
            />

            <div className="updatenode__bglabel">background:</div>
            <input
              value={nodeBg}
              onChange={(evt) => setNodeBg(evt.target.value)}
            />

            <div className="updatenode__checkboxwrapper">
              <div>hidden:</div>
              <input
                type="checkbox"
                checked={nodeHidden}
                onChange={(evt) => setNodeHidden(evt.target.checked)}
              />
            </div>
          </div>
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
          <button type="button" onClick={useRemoveNode}>
            {id} 노드삭제
          </button>
          <button type="button" onClick={onSave}>
            save
          </button>

          <button type="button" onClick={onRestore}>
            restore
          </button>
          <button type="button" onClick={() => onPublishRoadmap()}>
            로드맵 발행
          </button>
        </Panel>
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
export default function RoadMapCanvas({
  editor,
  label,
  roadMapTitle,
  onRoadMapTitleChange,
  onChangeLabel,
  setRoadMapTitle,
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
        roadMapTitle={roadMapTitle}
        onRoadMapTitleChange={onRoadMapTitleChange}
        setRoadMapTitle={setRoadMapTitle}
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
