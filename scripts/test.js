// eslint-disable-next-line
import { test, describe } from 'ava';

describe('Collaborative Editor', () => {
  it('should render editor with syntax highlighting', async t => {
    const editor = await render(<Editor language='javascript' />);
    t.true(editor.querySelector('.syntax-highlighted') !== null);
  });
});