export interface INode {
  col: number;
  row: number;
  distance: number;
  weight: number;
  heuristic: number;
  isVisited: boolean;
  whenVisited: number;
  previousNode: INode | null;
  isFinish: boolean;
  isStart: boolean;
  isWall: boolean;
  isPath: boolean;
}

export type ColAndRow = Pick<INode, 'col' | 'row'>;
export interface NodesState {
  nodes: INode[][];
  startNode: ColAndRow;
  endNode: ColAndRow;
}


export type Algorithms = 'dijkstra' | 'bfs' | 'astar' | 'dfs';
export type Tools = 'Walls' | 'Weight' | 'Eraser';
