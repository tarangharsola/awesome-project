{"import { EditorState } from 'draft-js';
import { OperationalTransform } from 'operational-transform';

const useConflictResolver = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const resolveConflict = (newState) => {
    const transform = OperationalTransform.fromJSON(newState.getJSON());
    const resolvedState = transform.apply(editorState.getJSON());
    return EditorState.push(editorState, resolvedState, 'insert-block');
  };

  return { resolveConflict };
};

export default useConflictResolver;