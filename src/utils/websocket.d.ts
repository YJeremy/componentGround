export interface Device {
  linkAddr: string;
  api: string;
}

export interface Position {
  type: 'cnclink' | 'robotlink';
  index: number;
}

export interface Action {
  type: string;
  payload: Object;
}
