export interface CRDTOperation {
  type: 'insert' | 'delete';
  position: number;
  text?: string;
  length?: number;
  clientId: string;
  timestamp: number;
}

export interface OTOperation {
  type: 'insert' | 'delete';
  position: number;
  text?: string;
  length?: number;
  revision: number;
  clientId: string;
}
