import { Modal } from '@mantine/core';
import { memo, useEffect, useState } from 'react';
import { Handle, NodeResizer, NodeToolbar, Position } from 'reactflow';

function CustomNode({ data, selected }) {
  const [text, setText] = useState('');
  const [opened, setOpened] = useState(false);

  const openModal = () => {
    setOpened(true);
  };

  const closeModal = () => {
    setOpened(false);
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    window.addEventListener('error', (e) => {
      if (e.message === 'ResizeObserver loop limit exceeded') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div',
        );
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay',
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    });
  }, []);

  return (
    <>
      <Modal opened={opened} onClose={closeModal}>
        <input type="text" value={text} onChange={handleInputChange} />
        <button type="button">저장</button>
      </Modal>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <NodeToolbar
        isVisible={data.toolbarVisible}
        position={data.toolbarPosition}
      >
        <button type="button" onClick={openModal}>
          상세정보 보기
        </button>
        <button type="button">copy</button>
        <button type="button">expand</button>
      </NodeToolbar>
      <div style={{ padding: '10px 20px' }}>{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default memo(CustomNode);
