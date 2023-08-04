/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import {
  Avatar,
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Drawer,
  Group,
  Modal,
  rem,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { IconChecklist, IconUser } from '@tabler/icons-react';
import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import { baseUrl } from 'axiosInstance/constants';
import { useInput } from 'components/common/hooks/useInput';
import { useRoadmapData } from 'components/roadmaps/posts/hooks/useRoadMapResponse';
import { useUser } from 'components/user/hooks/useUser';
import MainLayout from 'layout/mainLayout';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { styled } from 'styled-components';

import CommentPage from '../../main/commentPage';

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

function PostedRoadmap() {
  const navigate = useNavigate();
  const { classes, theme } = useStyles();
  const { pathname } = useLocation();
  const [participation, setParticipation] = useState();
  const [currentPage, setCurrentPage] = useState(
    pathname.slice(pathname.lastIndexOf('/') + 1),
  );
  const [isLoading, setLoading] = useState(true);
  const { roadmapById } = useRoadmapData(
    pathname.slice(pathname.lastIndexOf('/') + 1),
  );
  // const { joinRoadmap } = useRoadmap();
  const [currentRoadmap, setCurrentRoadmap] = useState(roadmapById?.data || []);
  const [label, onChangeLabel, setLabel] = useInput('');
  const [id, onChangeId, setId] = useInput('');
  const [toggle, onChangeToggle, setToggle] = useInput('');
  const [search] = useSearchParams();
  const { user } = useUser();
  // const [state, setState] = useState([
  //   { id: '1', details: `<div>자바스크립트</div>` },
  //   { id: '2', details: `<div>'함수 개념과 활용법'</div>` },
  //   { id: '2b', details: `<div>'자바스크립트 상세'</div>` },
  //   { id: '2c', details: `<div>'조건문과 반복문 상세'</div>` },
  // ]);
  const [state, setState] = useState([]);

  const [details, setDetails] = useState([]);
  useEffect(() => {
    // const url = user
    //   ? `${baseUrl}/roadmaps/${currentPage}`
    //   : `${baseUrl}/roadmaps/load-roadmap/${currentPage}`;
    // if (!user) {
    //   axios
    //     .get(url)
    //     .catch((e) => {
    //       // eslint-disable-next-line no-console
    //       console.log(e);
    //     })
    //     .then((v) => {
    //       setNodes(v?.data.nodes);
    //       setCurrentRoadmap({
    //         title: v?.data?.roadmap?.title,
    //         description: v?.data?.roadmap?.description,
    //         ownerAvatarUrl: v?.data?.roadmap?.ownerAvatarUrl,
    //         ownerNickname: v?.data?.roadmap?.ownerNickname,
    //         thumbnailUrl: v?.data?.roadmap?.thumbnailUrl,
    //         isJoined: v?.data?.isJoined,
    //       });
    //       setParticipation(v?.data.isJoined);
    //       const detailState = [];
    //       v?.data.nodes.map((j) => {
    //         detailState.push({ id: j.id, details: j.detailedContent });
    //       });
    //       setState(detailState);
    //       const edgeSet = new Set();
    //       const tempEdges = [];
    //       // eslint-disable-next-line array-callback-return
    //       v?.data?.edges.map((j) => {
    //         if (!edgeSet.has(j?.id)) {
    //           tempEdges.push(j);
    //         }
    //         edgeSet.add(j?.id);
    //       });
    //       setEdges(tempEdges);
    //     });
    // }

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
      .then((v) => {
        setNodes(v?.data.nodes);
        setCurrentRoadmap({
          title: v?.data?.title,
          description: v?.data?.description,
          ownerAvatarUrl: v?.data?.member?.ownerAvatarUrl,
          ownerNickname: v?.data?.member?.nickname,
          isJoined: v?.data?.isJoined,
          thumbnailUrl: v?.data?.member?.thumbnailUrl,
        });
        setLoading(false);
        setParticipation(v?.data?.isJoined);
        const detailState = [];
        v?.data.nodes.map((j) =>
          detailState.push({ id: j.id, details: j.detailedContent }),
        );
        setState(detailState);
        const edgeSet = new Set();
        const tempEdges = [];
        // eslint-disable-next-line array-callback-return
        v?.data?.edges.map((j) => {
          if (!edgeSet.has(j?.id)) {
            tempEdges.push(j);
          }
          edgeSet.add(j?.id);
        });
        setEdges(tempEdges);
      });

    // if (currentPage !== roadmapById?.data?.roadmap?.id) {
    //   setCurrentRoadmap(
    //     JSON.parse(localStorage.getItem('roadmapById'))?.data?.roadmap,
    //   );
    // }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
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
      editor.commands.setContent(filt[0]?.details || '');
    }
  }, [state, id, setToggle, label, editor]);

  const [nodeState, setNodes, onNodesChange] = useNodesState([]);
  const [edgeState, setEdges, onEdgesChange] = useEdgesState([]);
  const [isSelectable] = useState(true);
  const [isDraggable] = useState(false);
  const [isConnectable] = useState(false);
  const [zoomOnScroll] = useState(true); // zoom in zoom out
  const [panOnScroll] = useState(false); // 위아래 스크롤
  const [zoomOnDoubleClick] = useState(false);
  const [panOnDrag] = useState(true); // 마우스로 이동
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const proOptions = { hideAttribution: true };

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
      })
      .catch((e) => console.log(e));
  };

  return (
    <MainLayout>
      <Container px="xs" maw={1000}>
        <Title className={classes.title} mt={80}>
          {currentRoadmap?.title}
        </Title>
        <Group mt={20}>
          {currentRoadmap?.ownerNickname}
          <Avatar color="purple" radius="xl">
            {currentRoadmap?.ownerAvatarUrl || ''}
          </Avatar>
        </Group>

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
        <Button
          ml={800}
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
          {!isLoading && participation && user?.accessToken
            ? '참여 중'
            : !isLoading && (!participation || !user?.accessToken)
            ? '참여하기'
            : ''}
        </Button>
        <Text c="dimmed" className={classes.description} mt="md">
          {currentRoadmap?.description || ''}
        </Text>
        <SimpleGrid
          cols={4}
          spacing="xl"
          my={50}
          breakpoints={[{ maxWidth: 'md', cols: 1 }]}
        >
          <Card
            mb={30}
            shadow="md"
            radius="md"
            className={classes.card}
            padding="xl"
          >
            <IconUser
              size={rem(50)}
              stroke={2}
              color={theme.fn.primaryColor()}
            />
            <Text
              fz="lg"
              fw={500}
              className={classes.cardTitle}
              mt="md"
              c="dimmed"
            >
              참여인원: 명
            </Text>
          </Card>
          <Card
            mb={30}
            shadow="md"
            radius="md"
            className={classes.card}
            padding="xl"
          >
            <IconChecklist
              size={rem(50)}
              stroke={2}
              color={theme.fn.primaryColor()}
            />
            <Text
              fz="lg"
              fw={500}
              className={classes.cardTitle}
              mt="md"
              c="dimmed"
            >
              완료인원: 명
            </Text>
          </Card>
          {/* <Card
            mb={30}
            shadow="md"
            radius="md"
            className={classes.card}
            padding="xl"
          >
            <Icon24Hours
              size={rem(50)}
              stroke={2}
              color={theme.fn.primaryColor()}
            />
          </Card> */}
          {/* <Card
            mb={30}
            shadow="md"
            radius="md"
            className={classes.card}
            padding="xl"
          >
            <IconStars
              size={rem(50)}
              stroke={2}
              color={theme.fn.primaryColor()}
            />
            <Text
              fz="lg"
              fw={500}
              className={classes.cardTitle}
              mt="md"
              c="dimmed"
            >
              난이도: {currentRoadmap?.recommendedExecutionTimeUnit}
            </Text>
          </Card> */}
        </SimpleGrid>
        <EditorWrap>
          <div className="roadMapWrap">
            <ReactFlowProvider>
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
                <Drawer
                  opened={isOpen}
                  onClose={() => setIsOpen(!isOpen)}
                  overlayProps={{ opacity: 0.5, blur: 4 }}
                  position="right"
                  size="35%"
                >
                  <Center>
                    <EditorContent editor={editor} readOnly />
                  </Center>
                  <Center>
                    <Button
                      mt={30}
                      onClick={() => setIsOpen(!isOpen)}
                      variant="light"
                    >
                      닫기
                    </Button>
                  </Center>
                </Drawer>

                {/* <Modal opened={isOpen} onClose={() => setIsOpen(!isOpen)}>
                  <Center>
                    <EditorContent editor={editor} readOnly />
                  </Center>
                  <Center>
                    <Button
                      mt={30}
                      onClick={() => setIsOpen(!isOpen)}
                      variant="light"
                    >
                      닫기
                    </Button>
                  </Center>
                </Modal> */}
              </Wrap>
            </ReactFlowProvider>
          </div>
        </EditorWrap>
        <CommentPage />
      </Container>
    </MainLayout>
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
export default PostedRoadmap;
const EditorWrap = styled.div`
  & .editor {
    & > .content {
      width: 100%;
    }
  }

  & .roadMapWrap {
    overflow-x: hidden;
  }
`;
