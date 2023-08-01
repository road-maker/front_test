/* eslint-disable array-callback-return */
import 'reactflow/dist/style.css';

import dagre from '@dagrejs/dagre';
import {
  ActionIcon,
  Button,
  Center,
  ColorInput,
  Image,
  Input,
  LoadingOverlay,
  Modal,
  MultiSelect,
  Popover,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import { IconWand } from '@tabler/icons-react';
import axios from 'axios';
import { baseUrl } from 'axiosInstance/constants';
import { useRoadmap } from 'components/roadmaps/posts/hooks/useRoadmap';
import { useUser } from 'components/user/hooks/useUser';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import { setStoredRoadmap } from 'storage/roadmap-storage';
import { styled } from 'styled-components';
import { NewPrompt } from 'types/types';

import { useInput } from '../common/hooks/useInput';
import { RoadmapEdge, RoadmapNode, RoadmapNodes } from './types';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const flowKey = 'example-flow';

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node?.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge?.source, edge?.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node?.id);
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
    type: 'default',
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
    type: 'default',
    style: {
      background: '#fff',
      border: '1px solid black',
      borderRadius: 15,
      fontSize: 12,
    },
  },
];

const initialEdges = [
  { id: 'e11a', source: '1', target: '1a', type: edgeType, animated: true },
];
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

function Roadmap({
  editor,
  label,
  color,
  onChangeColor,
  setColor,
  roadMapTitle,
  roadmapImage,
  roadmapDescription,
  roadmapTag,
  onRoadMapTitleChange,
  setRoadMapTitle,
  setLabel,
  toggleEditor,
  onChangeLabel,
  id,
  setState,
  state,
  onChangeId,
  setId,
  // selectedNode,
  // setSelectedNode,
}) {
  // const { prompt } = usePromptAnswer();

  const edgeSet = new Set<RoadmapEdge['id']>();
  const nodeSet = new Set<RoadmapNode['id']>();
  // const [nodeState, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [nodeState, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edgeState, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [title, onChangeTitle, setTitle] = useInput(''); // 로드맵 제목
  // const [thumbnail, onChangeThumbnail, setThumbnail] = useInput(''); // 썸네일
  const [desc, onChangeDesc, setDesc] = useInput('');
  const [gptRes, setGptRes] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nodeBg, setNodeBg] = useState('#eee');
  const [nodeHidden, setNodeHidden] = useState(false);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const [useGpt, setUseGpt] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [nodeModal, setNodeModal] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [currentFlow, setCurrentFlow] = useState('');
  const [gptDisabled, setGptDisabled] = useState(false);

  const [selectedData, setSelectedData] = useState([
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
  ]);
  const { user } = useUser();
  const [files, setFiles] = useState<FileWithPath[]>([]); // 썸네일
  const navigate = useNavigate();
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    setGptRes(true);
    if (!user) {
      return navigate('/users/signin');
    }
    if (!localStorage.getItem('recent_gpt_search')) {
      setGptRes(false);
    }
    if (localStorage.getItem('recent_gpt_search')) {
      const localData: NewPrompt = JSON.parse(
        localStorage.getItem('recent_gpt_search'),
      );
      setKeyword(localData?.keyword);
      // setUseGpt(localData?.data);
      // if (useGpt.length > 0) {
      //   return setGptRes(false);
      // }
      // if (useGpt.length === 0) {
      axios
        .post(`${baseUrl}/gpt/roadmap?prompt=${localData.keyword}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.accessToken}`,
          },
        })
        .then((res) => {
          res?.data.length > 0 ? setGptRes(false) : setGptRes(true);
          setUseGpt(res?.data);
        })
        .then(() => {
          setGptRes(false);
        });
    }
  }, []);

  // const onSave = useCallback(() => { // 내부적으로 처리
  //   if (rfInstance) {
  //     const flow = rfInstance.toObject();
  //     localStorage.setItem(flowKey, JSON.stringify(flow));
  //     console.log(flow);
  //   }
  // }, [rfInstance]);

  useMemo(() => {
    const tmpNode = [];
    const tmpEdge = [];
    // console.log(useGpt);
    // eslint-disable-next-line array-callback-return
    useGpt.map((v) => {
      if (!nodeSet.has(v?.id)) {
        tmpNode.push({
          id: v?.id,
          data: {
            label: v?.content,
          },
          type: 'default',
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
          tmpEdge.push({
            id: `e${parseInt(v?.id, 10)}${v?.id}`,
            source: `${parseInt(v?.id, 10)}`,
            target: v.id,
            type: edgeType,
            animated: true,
          });
        }
        edgeSet.add(`e${parseInt(v?.id, 10)}${v?.id}`);
      }
    });
    setNodes(tmpNode);
    setEdges(tmpEdge);
  }, [useGpt]);

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodeState, edgeState, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodeState, edgeState, setEdges, setNodes],
  );

  useEffect(() => {
    // 자동 생성 후 formatting
    if (nodeState && edgeState && useGpt.length > 0 && isLoading) {
      onLayout('TB');
    }
  }, []);

  const proOptions = { hideAttribution: true };

  // const { x, y, zoom } = useViewport();

  useMemo(() => {
    // 노드 내용 수정
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

        return node;
      }),
    );
  }, [label, id]);

  useMemo(() => {
    setNodes([...nodeState]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const onConnect = useCallback(
    (params) => {
      setEdges((els) => addEdge(params, els));
    },
    [setEdges],
  );

  useMemo(() => {
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
      }
    };

    restoreFlow();
  }, [setNodes, setEdges, setViewport]);

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
        },
        type: 'default',
        position,
        // position: { x, y },
        style: {
          background: '#fff',
          border: '1px solid black',
          borderRadius: 15,
          fontSize: 12,
        },
      },
    ]);
    console.log(state); // 노드 추가!
    setState([...state, { id: (nodeCount + 1).toString(), details: '' }]);
  }, [nodeState, setNodes]);

  const { postRoadmap } = useRoadmap();

  const onPublishRoadmap = useCallback(() => {
    // const { edges, nodes, viewport } = getStoredRoadmap();
    // console.log('nodes', nodes);
    const nodesCopy = [...nodeState] as RoadmapNodes;
    const edgesCopy = [...edgeState];
    // eslint-disable-next-line array-callback-return
    nodesCopy.map((v) => {
      // eslint-disable-next-line array-callback-return
      state.map((item) => {
        if (v?.id === item?.id) {
          // eslint-disable-next-line no-param-reassign
          v.detailedContent = item?.details;
          console.log(item?.details);
          // v.details = item?.details;
        }
        // eslint-disable-next-line no-param-reassign
        v.positionAbsolute = v.position;
      });
    });
    edgesCopy.map((v) => {
      // eslint-disable-next-line no-param-reassign
      v.animated = true;
      // eslint-disable-next-line no-param-reassign
      v.type = edgeType;
    });

    const roadmapData = {
      roadmap: {
        title,
        description: desc,
        // thumbnailUrl: files,
        thumbnailUrl: '',
        // tag: roadmapTag,b
      },
      nodes: nodesCopy,
      edges: edgesCopy,
      viewport: defaultViewport,
    };

    axios
      .post(`${baseUrl}/roadmaps`, roadmapData, {
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((e) => {
        // console.log(e);
        alert('포스팅 성공!');
        navigate('/');
      })
      .catch((err) => console.log(err));
    // navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeState]);

  // const { deleteElements } = useReactFlow();
  // const useRemoveNode = useCallback(() => {
  //   setNodes((nds) => nds.filter((node) => node?.id !== label));
  // }, [label]);

  // const getGptExampleDetail = () => {
  //   setGptDisabled(true);
  //   axios
  //     .post(
  //       `${baseUrl}/gpt/detail?course=${label}`,
  //       {},
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${user?.accessToken}`,
  //         },
  //       },
  //     )
  //     .then((e) => {
  //       // console.log(e);
  //       // @ts-ignore
  //       const resDetail: string = e?.content;
  //       if (resDetail) {
  //         const resArr: Array<string | null> = resDetail.split('.');
  //         const copyState = [...state];
  //         const temp = [];
  //         copyState.map((v) => {
  //           if (v.id === id) {
  //             console.log('현재 content', v?.details);
  //             resArr.map((k) => {
  //               temp.push(`<p>${k}</p>`);
  //             });
  //             // eslint-disable-next-line no-param-reassign
  //             v.details += temp;
  //           }
  //         });
  //         console.log('현재 copyState', copyState);
  //         // setState(copyState);
  //         // setGptDisabled(false);
  //       }
  //       setGptDisabled(false);

  //       // setState(e?.content);
  //       // 상세 내용 에디터에 내용 넣어주기
  //     })
  //     .catch((err) => console.log(err));
  // };
  const getGptExampleDetail = useCallback(() => {
    setGptDisabled(true);
    axios
      .post(
        `${baseUrl}/gpt/detail?course=${label}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      )
      .then((e) => {
        // @ts-ignore
        const resDetail: string = e?.data?.content;
        if (resDetail) {
          const resArr: Array<string | null> = resDetail.split('.\n');
          const copyState = [...state];
          console.log('state', state);
          const temp = [];
          copyState.map((v) => {
            if (v.id === id) {
              console.log('현재 content', v?.details);
              resArr.map((k) => {
                temp.push(`<p>${k}</p>`);
              });
              // eslint-disable-next-line no-param-reassign
              v.details += temp;
            }
          });
          console.log('현재 copyState', copyState);
          setState(copyState);
          setGptDisabled(false);
        }
        // setGptDisabled(false);

        // setState(e?.content);
        // 상세 내용 에디터에 내용 넣어주기
      })
      .catch((err) => console.log(err));
  }, [id, state]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node?.id === id) {
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
    // setNodes((nds) =>
    //   nds.map((node) => {
    //     if (node?.id === id) {
    //       // when you update a simple type you can just update the value
    //       // eslint-disable-next-line no-param-reassign
    //       node.hidden = nodeHidden;
    //     }
    //     return node;
    //   }),
    // );
    setNodes((nds) =>
      nds.map((node) => {
        // if (node.id === '1') {
        if (node?.id === label) {
          // when you update a simple type you can just update the value
          // eslint-disable-next-line no-param-reassign
          node.data.label = label;
          // console.log(node.data.label);
        }
        return node;
      }),
    );
  }, [nodeState, edgeState]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  // const [selectedNode, setSelectedNode] = useState([]);
  // useOnSelectionChange({
  //   onChange: ({ nodes, edges }) => {
  //     // setSelectedNode(nodes);
  //     console.log('selectedNode', selectedNode);
  //     // setNodeModal(true);
  //   },
  // });

  return (
    <Wrap>
      <LoadingOverlay visible={gptRes} />
      <Modal opened={opened} onClose={close} size="40rem">
        <Center>
          <h2>로드맵 정보</h2>
        </Center>
        <TextInput
          mt={50}
          placeholder="제목을 입력하세요"
          label="로드맵 이름"
          value={title}
          onChange={onChangeTitle}
        />
        <MultiSelect
          label="로드맵 태그 설정"
          mt={20}
          data={selectedData}
          placeholder="태그를 선택해주세요"
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setSelectedData((current) => [...current, item]);
            return item;
          }}
        />
        <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles} mt={30}>
          <Text align="center">Drop images here</Text>
        </Dropzone>
        <SimpleGrid
          cols={4}
          breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
          mt={previews.length > 0 ? 'xl' : 0}
        >
          {previews}
        </SimpleGrid>
        <Textarea
          label="로드맵 설명"
          autosize
          minRows={5}
          maxRows={10}
          mt={30}
          value={desc}
          placeholder="내용을 입력하세요"
          onChange={onChangeDesc}
        />
        <Center>
          <Button
            mt={30}
            onClick={() => {
              // onSave();
              onPublishRoadmap();
            }}
          >
            작성하기
          </Button>
        </Center>
      </Modal>
      <Modal
        opened={confirmDelete}
        size="70%"
        onClose={() => setConfirmDelete(false)}
      >
        <Center>
          <Center>
            <h1>정말로 모든 노드를 지우겠습니까?</h1>
            <h3>모두 지우기를 누를 시 작업 내용을 복구할 수 없습니다.</h3>
          </Center>
          <div className="confirm_btn_wrap">
            <Button
              mt={30}
              onClick={() => {
                // setNodes([]);
                setNodes(initialNodes);
                setEdges([]);
                setConfirmDelete(false);
              }}
            >
              모두 지우기
            </Button>
            <Button
              mt={30}
              variant="outline"
              onClick={() => setConfirmDelete(false)}
            >
              취소
            </Button>
          </div>
        </Center>
      </Modal>
      <Panel position="top-center">
        <Modal opened={nodeModal} onClose={() => setNodeModal(false)} size="xl">
          <Wrap>
            <Center>
              <h1>상세내용</h1>
            </Center>

            <Popover
              width={200}
              position="bottom"
              withArrow
              shadow="md"
              opened={opened}
            >
              {/* <div style={{ float: 'right' }}> */}
              <div>
                <Popover.Target>
                  <ActionIcon
                    mt={10}
                    onMouseEnter={open}
                    onMouseLeave={close}
                    mb={10}
                    variant="outline"
                    onClick={() => {
                      getGptExampleDetail();
                    }}
                    loading={gptDisabled}
                  >
                    <IconWand size="1rem" />
                  </ActionIcon>
                </Popover.Target>
              </div>
              <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
                <Text size="sm">ChatGpt로 자동 생성하기</Text>
              </Popover.Dropdown>
            </Popover>

            <Input
              // icon={<IconAt />}
              value={label}
              mt={10}
              mb={10}
              onChange={(evt) => {
                setLabel(evt?.target?.value);
              }}
              placeholder="내용을 입력해주세요."
            />
            {/* <ColorInput value={} placeholder="Pick color" label="Your favorite color" />; */}
            <ColorInput
              mt={10}
              mb={20}
              placeholder="Pick color"
              label="노드의 배경색을 골라주세요."
            />
            {/* <input
              // value={selectedNode[0]?.style.background}
              onChange={(evt) => {
                // eslint-disable-next-line no-param-reassign
                // selectedNode[0].style.background = evt.target.value;
              }}
            />
             */}
            {/* <input
              value={selectedNode[0]?.data.label}
              onChange={(evt) => {
                selectedNode[0].data.label = evt.target.value;
              }}
            />
            <input
              value={selectedNode[0]?.data.label}
              onChange={(evt) => {
                selectedNode[0].data.label = evt.target.value;
              }}
            /> */}
            {toggleEditor}
          </Wrap>

          {/* {selectedNode[0]?.id === id && toggleEditor} */}

          <div className="confirm_btn_wrap">
            <Button
              mt={10}
              onClick={() => {
                setNodeModal(false);
              }}
            >
              닫기
            </Button>
          </div>
        </Modal>
      </Panel>
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
          setId(n?.id);
          // setSelectedNode(n);
          console.log('n', n);
          setNodeModal(true);
          // console.log('selectedNode', selectedNode);
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
        <Panel position="top-right">
          {currentFlow === 'LB' ? (
            <Button
              type="button"
              onClick={() => {
                onLayout('TB');
                setCurrentFlow('TB');
              }}
              mr={10}
            >
              vertical layout
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => {
                onLayout('LR');
                setCurrentFlow('LB');
              }}
              mr={10}
            >
              horizontal layout
            </Button>
          )}
          <Button type="button" onClick={() => onAddNode()} mr={10}>
            노드 추가
          </Button>
          {nodeState.length === 0 ? (
            <Button
              type="button"
              data-disabled
              sx={{
                '&[data-disabled]': { opacity: 0.8, pointerEvents: 'all' },
              }}
              onClick={() => setConfirmDelete(true)}
              mr={10}
            >
              노드 전체 삭제
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => setConfirmDelete(true)}
              mr={10}
            >
              노드 전체 삭제
            </Button>
          )}
          {/* <Button type="button" onClick={onRestore} mr={10}>
            restore
          </Button> */}
          <Button
            type="button"
            onClick={() => {
              // onSave();
              open();
            }}
            mr={10}
            mt={10}
          >
            로드맵 발행
          </Button>
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
  height: 93.2vh;
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

  & .confirm_btn_wrap {
    display: inline-flex;
    width: 100%;
  }
`;
export default function RoadMapCanvas({
  editor,
  label,
  roadMapTitle,
  roadmapImage,
  toggleEditor,
  roadmapDescription,
  roadmapTag,
  setLabel,
  onRoadMapTitleChange,
  setRoadMapTitle,
  id,
  onChangeLabel,
  setState,
  state,
  onChangeId,
  setId,
  color,
  onChangeColor,
  setColor,
  // selectedNode,
  // setSelectedNode,
}) {
  return (
    <ReactFlowProvider>
      <Roadmap
        editor={editor}
        setState={setState}
        label={label}
        color={color}
        onChangeColor={onChangeColor}
        setColor={setColor}
        // selectedNode={selectedNode}
        // setSelectedNode={setSelectedNode}
        roadMapTitle={roadMapTitle}
        roadmapImage={roadmapImage}
        toggleEditor={toggleEditor}
        roadmapDescription={roadmapDescription}
        onRoadMapTitleChange={onRoadMapTitleChange}
        roadmapTag={roadmapTag}
        setRoadMapTitle={setRoadMapTitle}
        setLabel={setLabel}
        state={state}
        onChangeId={onChangeId}
        onChangeLabel={onChangeLabel}
        id={id}
        setId={setId}
      />
    </ReactFlowProvider>
  );
}
