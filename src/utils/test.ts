{"import { expect } from 'chai';
import { formatCode } from './formatCode';

describe('formatCode', () => {
  it('should format code correctly', () => {
    const editorState = EditorState.create();
    const formattedCode = formatCode(editorState);
    expect(formattedCode).to.equal('');
  });
});