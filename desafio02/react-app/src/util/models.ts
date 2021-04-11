export interface Position {
  lat: number;
  lng: number;
}

export interface Route {
  id: string;
  title: string;
  startPosition: Position;
  endPosition: Position;
}