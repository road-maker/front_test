import { ReactElement } from 'react';
import ReactFlow, { MiniMap } from 'reactflow';

function Minimap(): ReactElement {
  return (
    <div style={{ width: '6rem', height: '6rem' }}>
      <ReactFlow fitView>
        <MiniMap zoomable pannable />
      </ReactFlow>
    </div>
  );
}
export default Minimap;
