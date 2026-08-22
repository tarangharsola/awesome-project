export interface User {
  id: string;
  name: string;
  color: string;
}

export interface RemoteCursor {
  userId: string;
  position: {
    line: number;
    ch: number;
  };
  color: string;
  name: string;
}

// Existing types (if any) remain unchanged below this line.
