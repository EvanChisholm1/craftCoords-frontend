export interface CoordsType {
  name: string;
  _id: string;
  x: number;
  y: number;
  z: number;
  owner: string;
  world: string;
  created: string;
}

export interface WorldType {
  created: string;
  _id: string;
  owner: string;
  coords: CoordsType[];
  name: string;
}
