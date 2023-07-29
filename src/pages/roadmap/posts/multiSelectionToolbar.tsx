import { NodeToolbar, useStore } from 'reactflow';

const selectedNodesSelector = (state) =>
  Array.from(state.nodeInternals.values())
    .filter((node) => (node as { id: string; selected: string }).selected)
    .map((node) => (node as { id: string }).id);

export default function MultiSelectionToolbar() {
  const selectedNodeIds = useStore(selectedNodesSelector);
  const isVisible = selectedNodeIds.length > 1;

  return (
    <NodeToolbar nodeId={selectedNodeIds} isVisible={isVisible}>
      <button type="button">multi selection toolbar</button>
    </NodeToolbar>
  );
}
