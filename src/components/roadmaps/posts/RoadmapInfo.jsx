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
  rem,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import {
  IconBook2,
  IconCalendarStats,
  IconCertificate,
  IconCircleArrowRightFilled,
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
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import { baseUrl } from 'axiosInstance/constants';
import { useInput } from 'components/common/hooks/useInput';
import { useUser } from 'components/user/hooks/useUser';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const submitBlogUrl = useCallback(() => {
    axios
      .post(
        `${baseUrl}/likes/like-roadmap/${currentRoadmap.id}`,
        {
          memberId: user?.nickname,
          roadmapNodeId: id,
          // "inProgressNodeId" : 0,
          submitUrl: blogUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      )
      .then((v) => {
        console.log(v);
        // setCurrentRoadmap({
        //   ...currentRoadmap,
        //   isLiked: v?.data.isLiked,
        //   likeCount: v?.data.likeCount,
        // });
      })
      .catch((err) => console.log(err));
  }, [blogUrl]);

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
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Card mt="2rem">
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
            <Avatar color="purple" radius="xl" size="md">
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
                {!isLoading && (!participation || !user?.accessToken)
                  ? '참여하기'
                  : ''}
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
                attributionPosition="top-right"
                onNodeClick={(e, n) => {
                  setLabel(`${n?.data?.label}`);
                  setId(`${n?.id}`);
                  setIsOpen(!isOpen);
                }}
                fitView
              />
              <Drawer
                opened={isOpen}
                onClose={() => setIsOpen(!isOpen)}
                overlayProps={{ opacity: 0.5, blur: 4 }}
                position="right"
                size="35%"
              >
                <Input.Wrapper label="블로그 인증">
                  <Input
                    icon={<IconCertificate />}
                    value={blogUrl}
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
                    placeholder="블로그 링크를 입력해주세요."
                  />
                </Input.Wrapper>
                <Center pl="sm" pr="sm">
                  <EditorContent editor={editor} readOnly />
                </Center>
                <Center>
                  {/* <Button
                    mt={30}
                    onClick={() => setIsOpen(!isOpen)}
                    variant="light"
                  >
                    닫기
                  </Button> */}
                </Center>
              </Drawer>
            </Wrap>
          </ReactFlowProvider>
        </div>
      </EditorWrap>
    </>
  );
}
const Wrap = styled.div`
  width: 100%;
  background-color: '#ebf6fc';
  /* height: 96vh; */
  height: 100em;

  & .react-flow__node {
    cursor: pointer;
  }

  & .react-flow__pane {
    cursor: auto;
  }

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
