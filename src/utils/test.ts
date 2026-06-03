// Test utilities
export function expectEqual(a: any, b: any) {
  if (a !== b) {
    throw new Error(`Expected ${a} to be equal to ${b}`);
  }
}

export function expectNotEqual(a: any, b: any) {
  if (a === b) {
    throw new Error(`Expected ${a} to not be equal to ${b}`);
  }
}