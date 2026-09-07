import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

// Curated palette of readable, non‑neon colors suitable for dark mode
const COLORS = ['#1abc9c', '#3498db', '#e67e22', '#e74c3c', '#f1c40f', '#2ecc71'];

function getRandomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export const createUser = (name: string): User => ({
  id: uuidv4(),
  name,
  color: getRandomColor(),
});
