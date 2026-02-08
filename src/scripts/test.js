import { describe, it, expect } from 'jest';
import { Editor } from '../components/Editor';

describe('Editor', () => {
  it('renders editor component', () => {
    const editor = new Editor();
    expect(editor).toBeTruthy();
  });
});