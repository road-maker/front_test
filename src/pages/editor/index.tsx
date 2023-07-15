import Editor from 'components/editor/Editor';
import { ReactElement } from 'react';

function EditorPage(): ReactElement {
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const canvas = canvasRef.current;

  // if (!canvas) return <div>null canvas!</div>;

  return (
    <div>
      {/* <canvas ref={canvasRef} /> */}
      <Editor />
    </div>
  );
}
export default EditorPage;
