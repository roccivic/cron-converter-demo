export type CronState = {
  expression: string;
  array: number[][];
  error: string;
  prev: string;
  next: string;
};

export type ValuePayload = {
  index: number;
  values: number[];
};
