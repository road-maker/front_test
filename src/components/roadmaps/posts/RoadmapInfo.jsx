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
  Container,
  createStyles,
  Drawer,
  Group,
  Modal,
  Popover,
  rem,
  ScrollArea,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';
import {
  IconBook2,
  IconCalendarStats,
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
// import CommentSection from 'components/comments';
import { useInput } from 'components/common/hooks/useInput';
import { useUser } from 'components/user/hooks/useUser';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
    fontWeight: 600,

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
  // const [blogKeyword, onChangeBlogKeyword, setBlogKeyword] = useInput('');
  const [blogUrl, onChangeBlogUrl, setBlogUrl] = useInput('');
  const [id, onChangeId, setId] = useInput('');
  const [toggle, onChangeToggle, setToggle] = useInput('');
  const [search] = useSearchParams();
  const { user } = useUser();
  const [state, setState] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/roadmaps/${currentPage}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      })
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
        data.nodes.map((j) =>
          detailState.push({ id: j.id, details: j.detailedContent }),
        );
        setState(detailState);
        const edgeSet = new Set();
        const tempEdges = [];
        // eslint-disable-next-line array-callback-return
        data?.edges.map((j) => {
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
      state.map((item, idx) => {
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
      })
      .catch((err) => console.log(err));
  };
  // const submitBlogUrl = useCallback(() => {
  //   axios
  //     .post(
  //       `${baseUrl}/likes/like-roadmap/${currentRoadmap.id}`,
  //       {
  //         memberId: user?.nickname,
  //         roadmapNodeId: id,
  //         // "inProgressNodeId" : 0,
  //         submitUrl: blogUrl,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user?.accessToken}`,
  //         },
  //       },
  //     )
  //     .then((v) => {
  //       console.log(v);
  //       // setCurrentRoadmap({
  //       //   ...currentRoadmap,
  //       //   isLiked: v?.data.isLiked,
  //       //   likeCount: v?.data.likeCount,
  //       // });
  //     })
  //     .catch((err) => console.log(err));
  // }, [blogUrl]);

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

  const updateRoadmapProgress = () => {
    // eslint-disable-next-line no-alert
    alert('진행 완료!');
    // axios
    //   .patch(
    //     `${baseUrl}/roadmaps/in-progress-nodes/${id}/done`,
    //     {
    //       inProgressNodeId: id,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${user?.accessToken}`,
    //       },
    //     },
    //   )
    //   .then((v) => {
    //     console.log(v);
    //     // setParticipation(true);
    //     // setCurrentRoadmap({
    //     //   ...currentRoadmap,
    //     //   joinCount: currentRoadmap.joinCount + 1,
    //     // });
    //   })
    //   .catch((e) => console.log(e));
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
      .then(() => {
        setParticipation(true);
        setCurrentRoadmap({
          ...currentRoadmap,
          joinCount: currentRoadmap.joinCount + 1,
        });
      })
      .catch((e) => console.log(e));
  };
  return (
    <Container>
      <Card mt="3rem">
        <div
          style={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Title className={classes.title}>{currentRoadmap?.title}</Title>
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

        <Group position="apart">
          <Group mt="1.5rem">
            <Avatar color="blue" size="md" radius="xl">
              {currentRoadmap?.ownerNickname?.substring(0, 1) || ''}
            </Avatar>
            {currentRoadmap?.ownerNickname}
            <Text c="dimmed" fz="md" ml={rem(20)}>
              {currentRoadmap?.createdAt}
            </Text>
          </Group>
          <Button
            style={{ float: 'right' }}
            loading={isLoading}
            disabled={isLoading || (participation && user?.accessToken)}
            variant="outline"
            color="violet"
            onClick={() => {
              if (!user?.accessToken) {
                setModal(true);
              }
              joinRoadmap();
            }}
          >
            {isLoading && ' 로딩 중'}
            {!isLoading && participation && user?.accessToken && '참여 중'}
            {!isLoading && (!participation || !user?.accessToken)
              ? '참여하기'
              : ''}
          </Button>
        </Group>

        <Group mt={rem(20)} />
        <Text mt="md" fz="lg">
          {currentRoadmap?.description || ''}
        </Text>

        <Group mt={rem(50)}>
          <IconUser size={rem(20)} stroke={2} color={theme.fn.primaryColor()} />{' '}
          <Text c="dimmed"> 참여인원: {currentRoadmap?.joinCount}명</Text>
        </Group>

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
                  setIsOpen(!isOpen);
                }}
                style={{ overflow: 'visible' }}
                // FitBoundsOptions={{ padding: '10px' }}
                // FitViewOptions={{ padding: '10px' }}
                // fitViewOptions={p}
              />
              {/* <Input.Wrapper label="블로그 인증">
        <Input
          icon={<IconCertificate />}
          value={blogUrl}
          placeholder="https://myblogUrl.io"
          onChange={onChangeBlogKeyword}
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
                disabled={blogKeyword.length === 0}
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
      </Input.Wrapper> */}

              <Drawer.Root
                opened={isOpen}
                scrollAreaComponent={ScrollArea.Autosize}
                onClose={() => setIsOpen(!isOpen)}
                position="right"
                ref={focusTrapRef}
              >
                <Drawer.Content
                  trapFocus={false}
                  onMouseLeave={useFocusTrap(false)}
                >
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
                          {currentRoadmap?.isJoined &&
                            nodeState.map((v) => {
                              if (v.id === id && participation) {
                                return (
                                  <IconCircleCheckFilled
                                    style={{
                                      color: 'green',
                                      marginRight: '10px',
                                    }}
                                  />
                                );
                              }
                              if (v.id === id && !participation) {
                                return (
                                  <IconCircleCheckFilled
                                    style={{
                                      color: 'grey',
                                      marginRight: '10px',
                                    }}
                                  />
                                );
                              }
                              return '';
                            })}
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
    </Container>
  );
}
const Wrap = styled.div`
  width: 100%;
  overflow: visible;
  height: 100em;

  & .react-flow__pane.react-flow__viewport.react-flow__container {
    height: 'fit-content';
    /* width: 'fit-content'; */
    transform: scale(0.45) !important;
  }

  & .mantine-ScrollArea-root {
    height: 100vh;
  }
  & .mantine-Drawer-body {
    height: 100vh;
  }

  & .react-flow__node {
    font-size: 3rem;
    cursor: pointer;
    margin-top: 10px;
    display: block;
    padding: 10px;
    z-index: 4;
    font-size: 12px;
  }

  & .react-flow__pane {
    cursor: auto;
  }
  & .react-flow {
    overflow: visible !important;
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
