export class Route {
  title: string;
  startPosition: IPosition;
  endPosition: IPosition;
}

export interface IPosition {
  lat: number;
  lng: number;
}