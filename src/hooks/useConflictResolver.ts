import { useEffect, useRef, useState } from "react";
import { ConflictOperation } from "../utils/conflict/types";
import { CRDT } from "../utils/conflict/crdt";
import { applyOT } from "../utils/conflict/ot";

/**
 * Hook that resolves concurrent edits using a simple CRDT fallback
 * and operational transformation for linear edits.
 *
 * @param initialContent The document's initial text.
 * @param remoteOps Queue of operations received from other peers.
 * @returns current content and a function to submit local operations.
 */
export function useConflictResolver(
  initialContent: string,
  remoteOps: ConflictOperation[]
) {
  const crdtRef = useRef(new CRDT(initialContent));
  const [content, setContent] = useState(initialContent);

  // Apply remote operations as they arrive
  useEffect(() => {
    if (remoteOps.length === 0) return;
    remoteOps.forEach((op) => {
      crdtRef.current.apply(op);
    });
    setContent(crdtRef.current.toString());
  }, [remoteOps]);

  // Submit a local operation
  const submitOperation = (op: ConflictOperation) => {
    // Optimistically apply locally
    crdtRef.current.apply(op);
    setContent(crdtRef.current.toString());

    // Transform against any pending remote ops (OT placeholder)
    // In a real implementation this would use a proper OT algorithm.
    applyOT(op);
  };

  return { content, submitOperation };
}
