{"import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

interface ConflictResolverProps {
  editor: { text: string; }
  webSocket: { send: (data: any) => void }
}

const useConflictResolver = ({ editor, webSocket }) => {
  const { text } = editor;
  const { send } = webSocket;

  const resolveConflict = (newText: string) => {
    send({ type: 'UPDATE_TEXT', newText });
  };

  return { resolveConflict };
}

export default useConflictResolver;