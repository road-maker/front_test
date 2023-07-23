// import { memo, useEffect } from 'react';
// import { Handle, NodeResizer, Position } from 'reactflow';

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
//         keepAspectRatio
//       />
//       <Handle type="target" position={Position.Left} />
//       {/* <div style={{ padding: 10 }}>{data.label}</div> */}
//       {/* <div style={{ padding: 10 }}>{data.label}</div> */}
//       {/* <div style={{ padding: 10 }}>{data?.label?.props?.dangerouslySetinnerHTML?.__html}</div> */}
//       <div style={{ padding: 10 }}>
//         {/* eslint-disable-next-line no-underscore-dangle */}
//         {/* {data?.label?.props?.dangerouslySetinnerHTML?.__html} */}
//         {data}
//       </div>
//       <Handle type="source" position={Position.Right} />
//     </>
//   );
// }

// export default memo(ResizableNodeSelected);
// // export default ResizableNodeSelected;

import { memo, useEffect } from 'react';
import { Handle, NodeResizer, Position } from 'reactflow';

function ResizableNodeSelected({ data, selected }) {
  // window.ResizeObserver = undefined;
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
      />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default memo(ResizableNodeSelected);
