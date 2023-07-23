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
