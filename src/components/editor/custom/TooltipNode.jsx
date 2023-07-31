import { ActionIcon } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { memo, useState } from 'react';
import { Handle, NodeToolbar, Position } from 'reactflow';

function TooltipNode({ data }) {
  const [isVisible, setVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <NodeToolbar isVisible={isVisible} position={data.toolbarPosition}>
        <ActionIcon color="blue">
          <IconPencil
            size="1.2rem"
            style={{ tranform: 'translateX(-30rem)' }}
          />
        </ActionIcon>
      </NodeToolbar>
      <div style={{ padding: 20 }}>{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(TooltipNode);
