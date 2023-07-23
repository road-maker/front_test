export interface position {
  x: number;
  y: number;
}
export interface style {
  background?: string;
  border?: string;
  borderRadius?: number;
  fontSize?: string;
}
export interface dataProps {
  children?: string;
  ref?: string | unknown;
}
export interface data {
  label?: string;
  key?: string | undefined;
  props?: dataProps;
}
export interface addedNode {
  id: string;
  height: number;
  width: number;
  dragging?: boolean;
  selected?: boolean;
  type?: string;
  data?: data;
  positionAbsolute?: position;
}

export interface XYPosition {
  x: number;
  y: number;
}
export type label = unknown;
export interface nodeStyle {
  background?: string;
  border?: string;
  borderRadius?: number;
  fontSize?: number;
}
export interface RoadmapNode {
  id: string;
  type?: string;
  position: XYPosition;
  data: label;
  style?: nodeStyle;
  content?: string;
}
// export type RoadmapNodes = Array<RoadmapNode> | Set<RoadMapEdge>;
export type RoadmapNodes = Array<RoadmapNode>;

export interface RoadMapEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  animated: boolean;
}
export type RoadMapEdges = Array<RoadMapEdge>;
