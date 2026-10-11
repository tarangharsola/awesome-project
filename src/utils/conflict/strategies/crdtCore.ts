import { CRDTDocument, CRDTOperation } from './crdtTypes';
import { compareVersions, mergeVersions } from './crdtUtils';

/**
 * Apply a remote CRDT operation to the local document state.
 * The function guards against duplicate application by comparing version
 * vectors and merges the incoming version vector with the local one.
 */
export function applyRemoteOperation(
  doc: CRDTDocument,
  op: CRDTOperation,
  remoteVersion: Record<string, number>
): CRDTDocument {
  // If the local version already includes the remote version, skip
  if (compareVersions(doc.version, remoteVersion) >= 0) {
    return doc;
  }

  // Merge version vectors to produce the new document version
  const newVersion = mergeVersions(doc.version, remoteVersion);

  // Apply the operation based on its type
  let newContent = doc.content;
  switch (op.type) {
    case 'insert':
      newContent =
        newContent.slice(0, op.position) + op.value + newContent.slice(op.position);
      break;
    case 'delete':
      newContent =
        newContent.slice(0, op.position) + newContent.slice(op.position + op.length);
      break;
    default:
      // Unknown operation – ignore but still update version vector
      return { ...doc, version: newVersion };
  }

  return {
    content: newContent,
    version: newVersion,
    siteId: doc.siteId,
  };
}
