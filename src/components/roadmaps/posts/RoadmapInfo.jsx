/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Center,
  createStyles,
  Drawer,
  Group,
  Input,
  Modal,
  Popover,
  rem,
  ScrollArea,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';
import {
  IconBook2,
  IconCalendarStats,
  IconCertificate,
  IconCircleArrowRightFilled,
  IconCircleCheckFilled,
  IconHeart,
  IconHeartFilled,
  IconUser,
} from '@tabler/icons-react';
import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import { baseUrl } from 'axiosInstance/constants';
import { useInput } from 'components/common/hooks/useInput';
import { useUser } from 'components/user/hooks/useUser';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { styled } from 'styled-components';

import { DoneStatusNode } from '../../editor/DoneStatusNode';
import { useRoadmapData } from './hooks/useRoadMapResponse';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginRight: 'auto',
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));
const nodeTypes = {
  custom: DoneStatusNode,
};
export default function RoadMapInfo() {
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [participation, setParticipation] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    pathname.slice(pathname.lastIndexOf('/') + 1),
  );
  const [isLoading, setLoading] = useState(true);
  const { roadmapById } = useRoadmapData(
    pathname.slice(pathname.lastIndexOf('/') + 1),
  );
  // @ts-ignore
  const [currentRoadmap, setCurrentRoadmap] = useState(roadmapById?.data || []);
  const [label, onChangeLabel, setLabel] = useInput('');
  const [blogKeyword, onChangeBlogKeyword, setBlogKeyword] = useInput('');
  const [blogUrl, onChangeBlogUrl, setBlogUrl] = useInput('');
  const [id, onChangeId, setId] = useInput('');
  const [toggle, onChangeToggle, setToggle] = useInput('');
  const { user } = useUser();
  const [state, setState] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/roadmaps/${currentPage}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      // .catch((e) => {
      // eslint-disable-next-line no-console
      // // console.log(e);
      // })
      // .then((value: AxiosResponse<ResponseType>) => {
      .then((value) => {
        const { data } = value;
        setNodes(data.nodes);
        setCurrentRoadmap({
          id: data?.id,
          title: data?.title,
          description: data?.description,
          createdAt: data?.createdAt,
          updatedAt: data?.updatedAt,
          ownerAvatarUrl: data?.member?.ownerAvatarUrl,
          ownerNickname: data?.member?.nickname,
          isJoined: data?.isJoined,
          joinCount: data?.joinCount,
          isLiked: data?.isLiked,
          likeCount: data?.likeCount,
          thumbnailUrl: data?.member?.thumbnailUrl,
          viewport: data?.viewport?.viewport,
        });
        setLoading(false);
        setParticipation(data?.isJoined);
        const detailState = [];
        data.nodes.forEach((j) =>
          detailState.push({ id: j.id, details: j.detailedContent }),
        );
        setState(detailState);
        const edgeSet = new Set();
        const tempEdges = [];
        // eslint-disable-next-line array-callback-return
        data?.edges.forEach((j) => {
          if (!edgeSet.has(j?.id)) {
            tempEdges.push(j);
          }
          edgeSet.add(j?.id);
        });
        setEdges(tempEdges);
      });
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Youtube.configure({
        inline: false,
        ccLanguage: 'ko',
        interfaceLanguage: 'ko',
      }),
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    editable: false,
    content: state.filter((v) => v.id === id)[0]?.details || '',
    onUpdate(e) {
      setToggle(e.editor?.getHTML());
      // eslint-disable-next-line array-callback-return
      state.forEach((item, idx) => {
        if (item.id !== id) return;
        const copyState = [...state];
        copyState.splice(idx, 1, {
          id: item.id,
          details: e.editor?.getHTML(),
        });
        setState(copyState);
      });
    },
  });

  useMemo(() => {
    const filt = state.filter((v) => v.id === id);
    setToggle(filt);
    if (editor) {
      editor.commands.setContent(filt[0]?.details || '내용이 없습니다.');
    }
  }, [state, id, setToggle, label, editor]);

  const widthRef = useRef(null);
  const heightRef = useRef(null);

  useEffect(() => {
    if (widthRef.current && heightRef.current) {
      widthRef.current.value = 640;
      heightRef.current.value = 480;
    }
  }, [widthRef.current, heightRef.current]);

  const addYoutubeVideo = () => {
    // eslint-disable-next-line no-alert
    const url = prompt('Enter YouTube URL');

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        // width: Math.max(320, parseInt(widthRef.current.value, 10)) || 640,
        // height: Math.max(180, parseInt(heightRef.current.value, 10)) || 480,
      });
    }
  };

  const onClickLikes = () => {
    axios
      .post(
        `${baseUrl}/likes/like-roadmap/${currentRoadmap.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      )
      .then((v) => {
        setCurrentRoadmap({
          ...currentRoadmap,
          isLiked: v?.data.isLiked,
          likeCount: v?.data.likeCount,
        });
      });
    // .catch((err) => // console.log(err));
  };
  const submitBlogUrl = useCallback(() => {
    // // console.log(`id : ${id}, ${currentRoadmap}`);
    // // console.log('currentRoadmap', currentRoadmap);
    // // console.log('nodeState', nodeState);
    // // console.log('id', id);
    const current = nodeState.filter((v) => v.id === id);
    // // console.log('current', current[0].blogKeyword);
    const blogKeywordId = current[0]?.blogKeyword?.id;
    // // console.log(blogKeywordId);
    // const blogKeyword = current[0]?.blogKeyword?.keyword;
    axios.post(
      `${baseUrl}/certified-blogs/submitUrl`,
      {
        // memberId: user?.nickname,
        // roadmapNodeId: id,
        // inProgressNodeId: blogKeywordId,
        blogKeywordId,
        // inProgressNodeId: 6168,
        submitUrl: blogUrl,
        // submitUrl: 'https://techpedia.tistory.com/18',
        // submitUrl: 'https://dbwp031.tistory.com/41',
        // submitUrl:
        // 'https://velog.io/@jiynn_12/%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%A1%9C-%ED%98%91%EC%97%85%ED%95%98%EA%B8%B0-husky',
      },
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    );
    // .then((v) => {
    // // console.log(v);
    // setCurrentRoadmap({
    //   ...currentRoadmap,
    //   isLiked: v?.data.isLiked,
    //   likeCount: v?.data.likeCount,
    // });
    // })
    // .catch((err) => // console.log(err));
  }, [blogUrl, id]);

  const [nodeState, setNodes, onNodesChange] = useNodesState([]);
  const [edgeState, setEdges, onEdgesChange] = useEdgesState([]);
  const [isSelectable] = useState(true);
  const [isDraggable] = useState(false);
  const [isConnectable] = useState(false);
  const [zoomOnScroll] = useState(false); // zoom in zoom out
  const [panOnScroll] = useState(false); // 위아래 스크롤
  const [zoomOnDoubleClick] = useState(false);
  const [panOnDrag] = useState(false); // 마우스로 이동
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const proOptions = { hideAttribution: true };

  const focusTrapRef = useFocusTrap();

  // const observerCallback: ResizeObserverCallback = (entries: ResizeObserverEntry[]) => {
  //   window.requestAnimationFrame((): void | undefined => {
  //     if (!Array.isArray(entries) || !entries.length) {
  //       return;
  //     }
  //     // yourResizeHandler();
  //   });
  // };
  // const resizeObserver = new ResizeObserver(observerCallback);

  // eslint-disable-next-line consistent-return
  const updateRoadmapProgress = () => {
    if (!user) {
      // eslint-disable-next-line no-alert
      alert('로그인 후 이용 가능합니다!');
      return navigate('/users/signin');
    }
    // if (!currentRoadmap.isJoined) {
    if (!participation) {
      // eslint-disable-next-line no-alert
      alert('참여하기 버튼 클릭 후 이용 가능합니다.');
      return setIsOpen(false);
    }
    // eslint-disable-next-line no-alert
    const copyState = [...nodeState];
    const current = nodeState.filter((v) => v.id === id);
    const nodeId = current[0]?.blogKeyword?.id;
    // eslint-disable-next-line array-callback-return
    copyState.forEach((v) => {
      if (v.id === id && participation) {
        // eslint-disable-next-line no-param-reassign
        v.done = true;
      }
    });
    nodeState.forEach((v) => {
      if (v.id === id && participation) {
        // eslint-disable-next-line no-param-reassign
        v.done = true;
        // eslint-disable-next-line no-param-reassign
        v.data.done = true;
        // eslint-disable-next-line no-param-reassign
        v.style.background = '#a8a6a6be';
      }
    });
    setState(copyState);
    setIsOpen(false);
    // eslint-disable-next-line no-alert
    return alert('진행 완료!');
    // axios
    //   .patch(
    //     `${baseUrl}/roadmaps/in-progress-nodes/${nodeId}/done`,
    //     {
    //       inProgressNodeId: nodeId,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${user?.accessToken}`,
    //       },
    //     },
    //   )
    //   // eslint-disable-next-line consistent-return
    //   .then((v) => {
    //     // console.log(v);
    //     if (v.status === 200) {
    //       // console.log(currentRoadmap);
    //       // console.log('copyState', copyState);
    //       copyState.forEach((m) => {
    //         if (m.id === id && (participation || currentRoadmap.isJoined)) {
    //           // eslint-disable-next-line no-param-reassign
    //           m.done = true;
    //           // m.done = v.done;
    //         }
    //       });
    //       nodeState.forEach((m) => {
    //         if (m.id === id && participation) {
    //           // eslint-disable-next-line no-param-reassign
    //           m.data.done = true;
    //           // eslint-disable-next-line no-param-reassign
    //           m.done = true;
    //           // eslint-disable-next-line no-param-reassign
    //           m.style.background = '#a8a6a6be';
    //         }
    //       });
    //       setState(copyState);
    //       setNodes(nodeState);
    //       setIsOpen(false);
    //       // eslint-disable-next-line no-alert
    //       return alert('진행 완료!');
    //     }
    //     // console.log('is state updated?', nodeState);
    //     // eslint-disable-next-line no-alert
    //     // setParticipation(true);
    //     // setCurrentRoadmap({
    //     //   ...currentRoadmap,
    //     //   joinCount: currentRoadmap.joinCount + 1,
    //     // });
    //   })
    //   .catch((e) => {
    //     if (e.status === 403) {
    //       // eslint-disable-next-line no-alert
    //       return alert('이미 진행을 완료했습니다.');
    //     }
    //     return // console.log(e);
    //   });
  };

  const joinRoadmap = () => {
    axios
      .post(
        `${baseUrl}/roadmaps/${parseInt(currentPage, 10)}/join`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      )
      .then((v) => {
        setParticipation(true);
        setCurrentRoadmap({
          ...currentRoadmap,
          joinCount: currentRoadmap.joinCount + 1,
        });
      });
    // .catch((e) => // console.log(e));
  };
  return (
    <>
      <Card mt="3rem">
        <div
          style={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Group mt="1rem">
            <Title className={classes.title}>{currentRoadmap?.title}</Title>
            <Avatar color="purple" size="md">
              {currentRoadmap?.ownerAvatarUrl || ''}
            </Avatar>
            {currentRoadmap?.ownerNickname}
          </Group>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <Text fz="md" fw={700}>
              {currentRoadmap?.likeCount > 1000000
                ? new Intl.NumberFormat('en-GB', {
                    notation: 'compact',
                    compactDisplay: 'short',
                  }).format(currentRoadmap?.likeCount)
                : currentRoadmap?.likeCount}
            </Text>
            {currentRoadmap?.isLiked ? (
              <ActionIcon color="red">
                <IconHeartFilled
                  onClick={() => onClickLikes()}
                  size="2rem"
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </ActionIcon>
            ) : (
              <ActionIcon>
                <IconHeart
                  onClick={() => onClickLikes()}
                  size="2rem"
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </ActionIcon>
            )}
          </div>
        </div>

        <div>
          <Text c="dimmed" mt="md">
            <IconCalendarStats
              size={rem(20)}
              stroke={2}
              color={theme.fn.primaryColor()}
            />{' '}
            만든 날짜 : {currentRoadmap?.createdAt}
          </Text>
          <Text c="dimmed" mt="md">
            <IconBook2
              size={rem(20)}
              stroke={2}
              color={theme.fn.primaryColor()}
            />{' '}
            {currentRoadmap?.description || ''}
          </Text>
          <Text c="dimmed" mt="sm">
            <div>
              <IconUser
                size={rem(20)}
                stroke={2}
                color={theme.fn.primaryColor()}
              />{' '}
              참여인원: {currentRoadmap?.joinCount}명
              <Button
                style={{ float: 'right' }}
                loading={isLoading}
                disabled={isLoading || (participation && user?.accessToken)}
                onClick={() => {
                  if (!user?.accessToken) {
                    setModal(true);
                  }
                  joinRoadmap();
                }}
              >
                {isLoading && ' 로딩 중'}
                {!isLoading && participation && user?.accessToken && '참여 중'}
                {!isLoading &&
                  (!participation || !user?.accessToken) &&
                  '참여하기'}
              </Button>
            </div>
          </Text>
        </div>
      </Card>
      <Modal
        opened={modal}
        size="70%"
        onClose={() => {
          setModal(false);
        }}
      >
        {!user && (
          <div>
            <Center>로그인 후 이용 가능합니다.</Center>
            <Button onClick={() => navigate('/users/signin')}>
              로그인하기
            </Button>
          </div>
        )}
      </Modal>

      <EditorWrap>
        <div className="roadMapWrap">
          <ReactFlowProvider>
            {/* <Wrap style={{ height: '70vh' }}> */}
            <Wrap>
              <ReactFlow
                nodes={nodeState}
                preventScrolling={false}
                // viewport={{
                //   // x: currentRoadmap?.viewport?.x,
                //   x: 0,
                //   // y: currentRoadmap?.viewport?.y,
                //   y: 0,
                //   zoom: 0.2,
                // }}
                // viewport={}
                // nodeTypes="default"
                nodeTypes={nodeTypes}
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
                panOnDrag={panOnDrag}
                // fitView
                attributionPosition="top-right"
                onNodeClick={(e, n) => {
                  setLabel(`${n?.data?.label}`);
                  setId(`${n?.id}`);
                  // // console.log(id);
                  // setIsOpen(!isOpen);
                  setIsOpen(true);
                }}
                style={{ overflow: 'visible' }}
                // FitBoundsOptions={{ padding: '10px' }}
                // FitViewOptions={{ padding: '10px' }}
                // fitViewOptions={p}
              />

              {/* <CommentSection /> */}
              <Drawer.Root
                opened={isOpen}
                scrollAreaComponent={ScrollArea.Autosize}
                onClose={() => setIsOpen(false)}
                position="right"
                keepMounted
                closeOnEscape
                lockScroll={false}
              >
                <Drawer.Content onMouseLeave={useFocusTrap(false)}>
                  <Drawer.CloseButton mr="1rem" mt="1rem" />
                  <Drawer.Body p="1rem" style={{ height: '100vh' }}>
                    <Popover
                      position="bottom"
                      withArrow
                      shadow="md"
                      width="target"
                    >
                      <Popover.Target>
                        <Button variant="outline" mb="lg">
                          {/* <IconCircleCheckFilled
                            style={{ color: 'green', marginRight: '10px' }}
                          /> */}
                          {participation &&
                            // nodeState.map((v) => {
                            nodeState.map((v) => {
                              if (v.id === id && v.done) {
                                // if (v.id === id && v.isdone) {
                                return (
                                  <IconCircleCheckFilled
                                    key={v.id}
                                    style={{
                                      color: 'green',
                                      marginRight: '10px',
                                    }}
                                  />
                                );
                              }
                              if (v.id === id && !v.done) {
                                return (
                                  <IconCircleCheckFilled
                                    key={v.id}
                                    style={{
                                      color: 'orange',
                                      marginRight: '10px',
                                    }}
                                  />
                                );
                              }
                              return '';
                            })}
                          {!participation && (
                            <IconCircleCheckFilled
                              style={{
                                color: 'grey',
                                marginRight: '10px',
                              }}
                            />
                          )}
                          진행상황 업데이트
                        </Button>
                      </Popover.Target>
                      <Popover.Dropdown>
                        <UnstyledButton>
                          <Group onClick={() => updateRoadmapProgress()}>
                            <IconCircleCheckFilled style={{ color: 'green' }} />
                            <div>
                              <Text>진행 완료</Text>
                            </div>
                          </Group>
                        </UnstyledButton>
                        <UnstyledButton>
                          <Group>
                            <IconCircleCheckFilled
                              style={{ color: 'orange' }}
                            />
                            <div>
                              <Text>진행 중</Text>
                            </div>
                          </Group>
                        </UnstyledButton>
                      </Popover.Dropdown>
                    </Popover>

                    <Input.Wrapper label="블로그 인증">
                      <Input
                        icon={<IconCertificate />}
                        value={blogUrl}
                        placeholder="https://myblogUrl.io"
                        // onChange={onChangeBlogUrl}
                        onChange={(e) => {
                          setBlogUrl(e.target.value);
                        }}
                        mt={10}
                        mb={10}
                        // disabled={keywordSubmitState}
                        rightSection={
                          <Tooltip
                            label="진행도를 체크할 블로그 링크를 등록해주세요."
                            position="top-end"
                            withArrow
                          >
                            <ActionIcon
                              disabled={blogUrl.length === 0}
                              variant="transparent"
                              onClick={() => {
                                submitBlogUrl();
                              }}
                            >
                              <IconCircleArrowRightFilled size="1rem" />
                            </ActionIcon>
                          </Tooltip>
                        }
                        // onChange={(evt) => {
                        //   setLabel(evt?.target?.value);
                        // }}
                      />
                    </Input.Wrapper>

                    <Center pl="1.25rem">
                      <EditorContent
                        editor={editor}
                        readOnly
                        style={{ lineHeight: '2rem' }}
                      />
                    </Center>
                    {/* <CommentSection /> */}
                  </Drawer.Body>
                </Drawer.Content>
              </Drawer.Root>
            </Wrap>
          </ReactFlowProvider>
        </div>
      </EditorWrap>
    </>
  );
}
const Wrap = styled.div`
  width: 100%;
  overflow: visible;
  height: 100em;

  & .react-flow__pane.react-flow__viewport.react-flow__container {
    height: 'fit-content';
    width: 'fit-content';
    transform: scale(0.45) !important;
  }

  & .mantine-ScrollArea-root {
    height: 100vh;
  }
  & .mantine-Drawer-body {
    height: 100vh;
  }

  & .react-flow__node {
    cursor: pointer;
    /* margin-top: 10px; */
    display: block;
    padding: 10px;
    z-index: 4;
    font-size: 1rem;
  }
  & .react-flow__node.react-flow__node-custom.selectable:hover {
    opacity: 30%;
    transform: scale(120%);
  }

  & .react-flow__pane {
    cursor: auto;
  }
  & .react-flow {
    zoom: 100% !important;
    /* overflow: visible !important; */
    overflow: scroll !important;
    overflow-x: hidden !important;
    /* zoom: 60% !important; */
    scrollbar-width: thin !important;
    scrollbar-color: #6969dd #e0e0e0 !important;
    & ::-webkit-scrollbar {
      width: 10px;
    }
    & ::-webkit-scrollbar-track {
      background-color: darkgrey !important;
    }
    & ::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
  }
`;
const EditorWrap = styled.div`
  & .editor {
    & > .content {
      width: 100%;
    }
  }

  /* & .roadMapWrap {
    overflow-x: hidden;
  } */
`;
