{"type Action = {
  type: string;
  id?: string;
  value?: string;
  cursor?: { x: number; y: number; };
  users?: any[];
};

interface User {
  id: string;
  name: string;
  color: string;
}

interface Room {
  id: string;
  users: User[];
}

interface EditorState {
  value: string;
  cursor: { x: number; y: number; };
}

interface UserState {
  id: string;
}

interface UsersState {
  [id: string]: User;
}

interface RootState {
  editor: EditorState;
  user: UserState;
  users: UsersState;
}

type Reducer<S = any, A = any> = (state: S, action: A) => S;

type Store<S = any, A = any> = {
  dispatch: (action: A) => void;
  getState: () => S;
  subscribe: (listener: (state: S) => void) => () => void;
};

type Dispatch<A = any> = (action: A) => void;

type Selector<S = any, R = any> = (state: S) => R;

type Middleware<A = any> = (store: Store<S, A>) => Store<S, A>;

type Enhancer<S = any, A = any> = (store: Store<S, A>) => Store<S, A>;

type Reducer<S = any, A = any> = (state: S, action: A) => S;

type ReducerMap<S = any, A = any> = {
  [key: string]: Reducer<S, A>;
};

type ReducerMapObject<S = any, A = any> = {
  [key: string]: Reducer<S, A>;
};

type ReducerMapArray<S = any, A = any> = Reducer<S, A>[];

type ReducerMapObjectArray<S = any, A = any> = ReducerMapObject<S, A>[];

type ReducerMapArrayObject<S = any, A = any> = ReducerMapArray<S, A>[];

type ReducerMapObjectArrayObject<S = any, A = any> = ReducerMapObjectArray<S, A>[];

type ReducerMapArrayObjectArray<S = any, A = any> = ReducerMapArrayObject<S, A>[];

type ReducerMapObjectArrayObjectArray<S = any, A = any> = ReducerMapObjectArrayObject<S, A>[];

type ReducerMapArrayObjectArrayObjectArray<S = any, A = any> = ReducerMapArrayObjectArrayObject<S, A>[];

type ReducerMapObjectArrayObjectArrayObjectArray<S = any, A = any> = ReducerMapObjectArrayObjectArrayObject<S, A>[];

type ReducerMapArrayObjectArrayObjectArrayObjectArray<S = any, A = any> = ReducerMapArrayObjectArrayObjectArrayObject<S, A>[];

type ReducerMapObjectArrayObjectArrayObjectArrayObjectArray<S = any, A = any> = ReducerMapObjectArrayObjectArrayObjectArrayObject<S, A>[];

type ReducerMapArrayObjectArrayObjectArrayObjectArrayObjectArray<S = any, A = any> = ReducerMapArrayObjectArrayObjectArrayObjectArrayObject<S, A>[];

