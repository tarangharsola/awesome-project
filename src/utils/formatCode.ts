{"import { format } from 'prettier';

const formatCode = (code: string) => {
  return format(code);
};

export default formatCode;