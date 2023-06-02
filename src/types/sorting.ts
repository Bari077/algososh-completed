import { ElementStates } from "./element-states";

export type TChar = {
  item: string | number;
  id?: number;
  state?: ElementStates;
  head?: string | JSX.Element | undefined;
  tail?: string | JSX.Element |undefined;
}

export type TSortSettings = {
  minQtyElements: number,
  maxQtyElements: number,
  minValue: number,
  maxValue: number,
}