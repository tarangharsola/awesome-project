export interface CRDTNode {
  id: string;
  value: string;
}

export interface CRDTInsert {
  type: 'insert';
  id: string;
  value: string;
  position: number;
}

export interface CRDTDelete {
  type: 'delete';
  id: string;
}
