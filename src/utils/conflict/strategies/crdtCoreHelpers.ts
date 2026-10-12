export function generateId(): string {
  // Simple unique identifier combining random part and timestamp
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
