import { ReactElement } from 'react';
import ReactFlow, { MiniMap } from 'reactflow';

function Minimap(): ReactElement {
  // const nodeColor = (node) => {
  //   switch (node.type) {
  //     case 'input':
  //       return '#6ede87';
  //     case 'output':
  //       return '#6865A5';
  //     default:
  //       return '#ff0072';
  //   }
  // };
  return (
    <div style={{ width: '6rem', height: '6rem' }}>
      <ReactFlow fitView>
        {/* <MiniMap zoomable pannable nodeColor={nodeColor} /> */}
        <MiniMap zoomable pannable />
      </ReactFlow>
    </div>
  );
}
export default Minimap;
