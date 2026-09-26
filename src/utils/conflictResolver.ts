import { crdtApply } from "./conflict/strategies/crdt";
import { otApply } from "./conflict/strategies/ot";

export type Operation = any;

export function resolveConflict(current: string, operation: Operation): string {
  try {
    return crdtApply(current, operation);
  } catch {
    return otApply(current, operation);
  }
}
