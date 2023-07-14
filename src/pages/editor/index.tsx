import { ReactElement, useRef } from 'react';

function EditorPage(): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;

  if (!canvas) return <div>null canvas!</div>;

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}
export default EditorPage;
