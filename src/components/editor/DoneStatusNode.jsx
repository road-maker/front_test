import { ActionIcon } from '@mantine/core';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { memo } from 'react';
import { Handle, Position, useViewport } from 'reactflow';
import { styled } from 'styled-components';

export function DoneStatusNode({ data, done, viewport }) {
  const { x, y, zoom } = useViewport();
  console.log(`${x},${y},${zoom}`);
  console.log(`${viewport}`);
  // eslint-disable-next-line no-param-reassign
  return (
    <Wrap className="node">
      <Handle style={{ opacity: 0 }} type="target" position={Position.Left} />
      <Handle style={{ opacity: 0 }} type="target" position={Position.Top} />
      {done ? (
        <ActionIcon
          style={{
            color: 'green',
            transform: 'translateX(-1rem) translateY(-6rem)',
          }}
        >
          <IconCircleCheckFilled size="1.5rem" />
        </ActionIcon>
      ) : (
        <ActionIcon
          size="1.5rem"
          style={{
            color: '#868e96',
            transform: 'translateX(-0.5rem) translateY(-0.25rem)',
          }}
        >
          <IconCircleCheckFilled />
        </ActionIcon>
      )}
      <div>{data.label}</div>
      <Handle style={{ opacity: 0 }} type="source" position={Position.Right} />
      <Handle style={{ opacity: 0 }} type="source" position={Position.Bottom} />
    </Wrap>
  );
}
export default memo(DoneStatusNode);

const Wrap = styled.div`
  .node {
    border-radius: 15px;
    border: 1px solid #000;
    padding: 20px;
    font-size: 3rem;
    box-sizing: border-box;
  }
  .react-flow__node .react-flow__node-custom {
    font-size: 48px;
  }
  .node :global .react-flow__resize-control.handle {
    width: 10px;
    height: 10px;
    border-radius: 100%;
  }
`;
