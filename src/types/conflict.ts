export interface CRDTOperation {
  type: 'insert' | 'delete';
  position: number;
  text?: string;
  length?: number;
  id: string;
  userId: string;
}

export interface CRDTDocument {
  content: string;
  operations: CRDTOperation[];
}
