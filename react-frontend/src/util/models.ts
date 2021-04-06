export interface Position {
  lat: number;
  lng: number;
}
export interface Route {
  _id: string;
  title: string;
  startPosition: Position;
  endPosition: Position;
}
