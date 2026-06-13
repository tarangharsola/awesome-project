import { Editor } from './Editor';

describe('Editor', () => {
  it('should render editor', () => {
    const editor = new Editor();
    expect(editor).toBeTruthy();
  });
});