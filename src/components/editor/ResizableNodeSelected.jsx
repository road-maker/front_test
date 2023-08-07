/* eslint-disable react-hooks/exhaustive-deps */
import Typer from 'components/common/typingAnimation/Typer';
import { memo, useEffect, useState } from 'react';
import { Handle, NodeResizer, Position } from 'reactflow';

export function ResizableNodeSelected({ data, selected }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data !== '내용을 입력해주세요.') {
      setIsLoading(false);
    }
  }, [isLoading]);
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
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
        keepAspectRatio
      />
      <Handle type="target" position={Position.Left} id="a" />
      <Handle type="target" position={Position.Top} id="b" />
      {data.length > 2 ? (
        <div style={{ padding: 10 }}>{data.label}</div>
      ) : (
        <Typer style={{ padding: 10 }} data={data.label} />
      )}
      <Handle type="source" position={Position.Right} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" />
    </>
  );
}

export default memo(ResizableNodeSelected);
// // export default ResizableNodeSelected;

// function ResizableNodeSelected({ data, selected }) {
//   // window.ResizeObserver = undefined;
//   useEffect(() => {
//     window.addEventListener('error', (e) => {
//       if (e.message === 'ResizeObserver loop limit exceeded') {
//         const resizeObserverErrDiv = document.getElementById(
//           'webpack-dev-server-client-overlay-div',
//         );
//         const resizeObserverErr = document.getElementById(
//           'webpack-dev-server-client-overlay',
//         );
//         if (resizeObserverErr) {
//           resizeObserverErr.setAttribute('style', 'display: none');
//         }
//         if (resizeObserverErrDiv) {
//           resizeObserverErrDiv.setAttribute('style', 'display: none');
//         }
//       }
//     });
//   }, []);
//   return (
//     <>
//       <NodeResizer
//         color="#ff0071"
//         isVisible={selected}
//         minWidth={100}
//         minHeight={30}
//       />
//       <Handle type="target" position={Position.Left} />
//       <div style={{ padding: 10 }}>{data.label}</div>
//       <Handle type="source" position={Position.Right} />
//     </>
//   );
// }

// export default memo(ResizableNodeSelected);
