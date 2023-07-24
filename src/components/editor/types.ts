export interface Id {
  id: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface DataProps {
  children?: string;
  ref?: string | unknown;
}
export interface Data {
  label?: string;
  // key?: string | undefined;
  // props?: DataProps;
}
export interface AddedNode {
  id: string;
  height: number;
  width: number;
  dragging?: boolean;
  selected?: boolean;
  type?: string;
  data?: Data;
  positionAbsolute?: Position;
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

export type RoadmapNodes = Array<RoadmapNode>;

export interface RoadmapEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  animated: boolean;
}
export type RoadmapEdges = Array<RoadmapEdge>;
export type zoom = number;
// export type Viewport = XYPosition | zoom | null;

export interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

export interface NewRoadmap {
  title?: string;
  description?: string;
  recommendedExecutionTimeValue?: number;
  recommendedExecutionTimeUnit?: string;
  edges: RoadmapEdges | [];
  // nodes: RoadmapNodes | [];
  nodes: RoadmapNodes;
  viewport: Viewport;
}

export type Roadmap = NewRoadmap & Id;
