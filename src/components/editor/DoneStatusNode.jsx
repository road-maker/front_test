import { ActionIcon } from '@mantine/core';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { Handle, Position } from 'reactflow';

export function DoneStatusNode({ data, done, id }) {
  return (
    <div>
      {/* {nodes.id===id && nodes.sourcePosition==="right" ? } */}
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Top} />
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
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
