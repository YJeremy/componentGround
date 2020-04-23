import { Device, Position, Action } from './websocket';

export declare function createWS(
  device: Device,
  position: Position,
  dispatch: (action: Action) => void
): void;

export declare function createWS4Robot(dispatch: (action: Action) => void): void;
