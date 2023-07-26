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
// export interface data {
//   label?: string;
//   // key?: string | undefined;
//   // props?: DataProps;
// }
// export type label = string | unknown;
// export type label = string;
// export type data = label;
export interface AddedNode {
  id: string;
  height: number;
  width: number;
  dragging?: boolean;
  selected?: boolean;
  type?: string;
  data?: { label: string };

  positionAbsolute?: Position;
}

export interface XYPosition {
  x: number;
  y: number;
}

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
  data: { label: string };
  style?: nodeStyle;
  content?: string;
  targetPosition?: string;
  sourcePosition?: string;
  selected?: boolean;
  detailedContent?: string;
  positionAbsolute?: Position;
  dragging?: boolean;
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
  nodes: RoadmapNodes;
  detailedContent?: string;
  // nodes: RoadmapNodes | [];
  viewport: Viewport;
}

export type Roadmap = NewRoadmap & Id;
