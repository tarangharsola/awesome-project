import { crdtStrategy } from "./strategies/crdt";
import { otStrategy } from "./strategies/ot";

export const conflictResolvers = {
  crdt: crdtStrategy,
  ot: otStrategy,
};

export default conflictResolvers;
