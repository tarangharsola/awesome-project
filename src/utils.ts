{"import { v4 as uuidv4 } from 'uuid';

export function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}${Math.floor(Math.random() * 16777215).toString(16)}${Math.floor(Math.random() * 16777215).toString(16)});
}

export function generateRandomUsername(): string {
  return `user${uuidv4()}`;
}
}