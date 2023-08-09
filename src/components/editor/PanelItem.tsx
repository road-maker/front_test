/* eslint-disable no-nested-ternary */
import { ActionIcon, Tooltip } from '@mantine/core';
import {
  IconBinaryTree,
  IconFileCheck,
  IconInfoCircle,
  IconPlus,
  IconSchema,
  IconTrashX,
} from '@tabler/icons-react';

export default function PanelItem({
  onLayout,
  setCurrentFlow,
  edgeState,
  nodeState,
  setConfirmDelete,
  setSubmitModal,
  onAddNode,
  getViewport,
  setCurrentView,
  currentView,
  currentFlow,
}) {
  //   const theme = useMantineTheme();
  //   const getColor = (color: string) =>
  //     theme.colors[color][theme.colorScheme === 'dark' ? 5 : 7];

  return (
    <>
      {/* <Accordion
        variant="contained"
        styles={{
          item: {
            // styles added to all items
            backgroundColor: '#fff',
          },
        }}
      >
        <Accordion.Item value="photos">
          <Tooltip label="로드맵 방향 설정">
            <Accordion.Control disabled={edgeState.length < 1}>
              <ActionIcon variant="default">
                <IconSchema />
              </ActionIcon>
            </Accordion.Control>
          </Tooltip>
          <Accordion.Panel>
            <UnstyledButton
              onClick={() => {
                onLayout('TB');
                setCurrentFlow('TB');
              }}
            >
              <IconBinaryTree
                size={rem(20)}
                color={getColor('blue')}
                style={{ marginRight: '1rem' }}
              />
              vertical layout
            </UnstyledButton>
          </Accordion.Panel>
          <Accordion.Panel>
            <UnstyledButton
              disabled={edgeState.length < 1}
              onClick={() => {
                onLayout('LR');
                setCurrentFlow('LR');
              }}
              mr={10}
            >
              <IconBinaryTree
                size={rem(20)}
                color={getColor('blue')}
                style={{ transform: 'rotate(-90deg)', marginRight: '1rem' }}
              />
              horizontal layout
            </UnstyledButton>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion> */}
      <Tooltip
        label={`${
          edgeState.length < 1
            ? '노드들을 이어주세요.'
            : currentFlow === 'LR'
            ? 'horizontal flow로 변경'
            : 'vertical flow로 변경'
        }`}
      >
        {currentFlow !== 'TB' && currentFlow !== 'LR' ? (
          <ActionIcon
            variant="default"
            onClick={() => {
              if (currentFlow !== 'TB') {
                onLayout('LR');
                setCurrentFlow('LR');
              } else if (currentFlow !== 'LR') {
                onLayout('TB');
                setCurrentFlow('TB');
              }
            }}
          >
            <IconSchema data-disabled size="1rem" />
          </ActionIcon>
        ) : currentFlow === 'TB' ? (
          <ActionIcon
            variant="default"
            onClick={() => {
              onLayout('LR');
              setCurrentFlow('LR');
            }}
          >
            <IconBinaryTree
              size="1rem"
              style={{ transform: 'rotate(-90deg)' }}
            />
          </ActionIcon>
        ) : (
          <ActionIcon
            variant="default"
            onClick={() => {
              onLayout('TB');
              setCurrentFlow('TB');
            }}
          >
            <IconBinaryTree size="1rem" />
          </ActionIcon>
        )}
      </Tooltip>
      <Tooltip label="모두 삭제">
        {nodeState.length === 0 ? (
          <ActionIcon
            variant="default"
            sx={{
              '&[data-disabled]': { opacity: 0.8, pointerEvents: 'all' },
            }}
          >
            <IconTrashX data-disabled size="1rem" />
          </ActionIcon>
        ) : (
          <ActionIcon variant="default" onClick={() => setConfirmDelete(true)}>
            <IconTrashX size="1rem" />
          </ActionIcon>
        )}
      </Tooltip>

      <Tooltip label="노드 추가">
        <ActionIcon
          variant="default"
          onClick={() => {
            const { zoom } = getViewport();
            setCurrentView({
              x: currentView.x,
              y: nodeState.at(-1)?.position?.y,
              zoom,
            });
            onAddNode();
          }}
        >
          <IconPlus data-disabled size="1rem" />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="그룹화하는 방법 : 'Shift' + 드래그 ">
        <ActionIcon variant="default">
          <IconInfoCircle data-disabled size="1rem" />
        </ActionIcon>
      </Tooltip>
      <Tooltip
        label={`${
          nodeState.length !== 0 && edgeState.length !== 0
            ? '로드맵 발행'
            : '노드를 추가해주거나 이어주세요'
        }`}
      >
        {nodeState.length === 0 || edgeState.length === 0 ? (
          <ActionIcon
            variant="default"
            sx={{
              '&[data-disabled]': { opacity: 0.8, pointerEvents: 'all' },
            }}
          >
            <IconFileCheck data-disabled size="1rem" />
          </ActionIcon>
        ) : (
          <ActionIcon variant="default" onClick={() => setSubmitModal(true)}>
            <IconFileCheck size="1rem" />
          </ActionIcon>
        )}
      </Tooltip>
    </>
  );
}
