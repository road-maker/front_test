import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { styled } from 'styled-components';

export function DoneStatusNode({ data }) {
  return (
    <>
      {/* {!done && typeof done === 'boolean' && (
      <IconCircleCheckFilled
        size="1.5em"
        style={{
          color: '#868e96',
          transform: 'translateX(-2.1rem) translateY(-1.5rem)',
        }}
      />
      )}
      {done && (
        <IconCircleCheckFilled
          size="1.5rem"
          style={{
            color: 'green',
            transform: 'translateX(-1rem) translateY(-6rem)',
          }}
        />
      )} */}
      {/* <Wrap className="node">
        <Handle style={{ opacity: 0 }} type="target" position={Position.Left} />
        <Handle style={{ opacity: 0 }} type="target" position={Position.Top} />
        {data.done ? (
          <div
            style={{
              backgroundColor: '#a8a6a6be',
              textDecoration: 'line-through',
              // maxWidth: '240px',
              // maxWidth: '9rem',
              maxWidth: '12rem',
              // fontSize: '24px',
              fontSize: '1rem',
            }}
          >
            {data.label}
          </div>
        ) : (
          <div
            style={{
              // maxWidth: '240px',
              // maxWidth: '9rem',
              maxWidth: '12rem',
              fontSize: '1rem',
            }}
          >
            {data.label}
          </div>
        )}
        <Handle
          style={{ opacity: 0 }}
          type="source"
          position={Position.Right}
        />
        <Handle
          style={{ opacity: 0 }}
          type="source"
          position={Position.Bottom}
        />
      </Wrap> */}
      {data.done ? (
        <Wrap
          className="node"
          style={{
            textDecoration: 'line-through',
            maxWidth: '12rem',
            fontSize: '1rem',
          }}
        >
          <Handle
            style={{ opacity: 0 }}
            type="target"
            position={Position.Left}
          />
          <Handle
            style={{ opacity: 0 }}
            type="target"
            position={Position.Top}
          />
          {data.label}
          <Handle
            style={{ opacity: 0 }}
            type="source"
            position={Position.Right}
          />
          <Handle
            style={{ opacity: 0 }}
            type="source"
            position={Position.Bottom}
          />
        </Wrap>
      ) : (
        <Wrap
          className="node"
          style={{
            maxWidth: '12rem',
            fontSize: '1rem',
          }}
        >
          <Handle
            style={{ opacity: 0 }}
            type="target"
            position={Position.Left}
          />
          <Handle
            style={{ opacity: 0 }}
            type="target"
            position={Position.Top}
          />
          {data.label}
          <Handle
            style={{ opacity: 0 }}
            type="source"
            position={Position.Right}
          />
          <Handle
            style={{ opacity: 0 }}
            type="source"
            position={Position.Bottom}
          />
        </Wrap>
      )}
      {/* <Wrap className="node">
        <Handle style={{ opacity: 0 }} type="target" position={Position.Left} />
        <Handle style={{ opacity: 0 }} type="target" position={Position.Top} />
        {data.done ? (
          <div
            style={{
              backgroundColor: '#a8a6a6be',
              textDecoration: 'line-through',
              // maxWidth: '240px',
              // maxWidth: '9rem',
              maxWidth: '12rem',
              // fontSize: '24px',
              fontSize: '1rem',
            }}
          >
            {data.label}
          </div>
        ) : (
          <div
            style={{
              // maxWidth: '240px',
              // maxWidth: '9rem',
              maxWidth: '12rem',
              fontSize: '1rem',
            }}
          >
            {data.label}
          </div>
        )}
        <Handle
          style={{ opacity: 0 }}
          type="source"
          position={Position.Right}
        />
        <Handle
          style={{ opacity: 0 }}
          type="source"
          position={Position.Bottom}
        />
      </Wrap> */}
    </>
  );
}
export default memo(DoneStatusNode);

const Wrap = styled.div`
  .node {
    border-radius: 15px;
    border: 1px solid #000;
    box-sizing: border-box;
    width: 240px;
  }
  .react-flow__node.react-flow__node-custom {
    font-size: 1rem !important;
  }
  .react-flow__node.react-flow__node-custom.selectable {
    padding: 0;
  }
`;
