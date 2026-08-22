import { EditorChange } from '../types';

export interface ConflictResolver {
  version: number;
  applyLocalChange(change: EditorChange): { change: EditorChange; version: number };
  applyRemoteChange(change: EditorChange, remoteVersion: number): EditorChange | null;
  getCurrentVersion(): number;
}

/**
 * Simple version‑based conflict resolver.
 * For each edit we increment a monotonically increasing version number.
 * Remote edits with a version newer than the local version are applied;
 * older or duplicate versions are ignored. This provides deterministic
 * ordering without requiring a heavy OT/CRDT library.
 */
export function createConflictResolver(initialContent: string = ''): ConflictResolver {
  let doc = initialContent;
  let version = 0;

  function applyLocalChange(change: EditorChange) {
    // In this simplified model we replace the whole document content.
    // Real implementations could apply incremental diffs.
    doc = change.text;
    version += 1;
    return { change, version };
  }

  function applyRemoteChange(change: EditorChange, remoteVersion: number) {
    if (remoteVersion <= version) {
      // Stale or duplicate update – ignore to keep state consistent.
      return null;
    }
    doc = change.text;
    version = remoteVersion;
    return change;
  }

  function getCurrentVersion() {
    return version;
  }

  return { version, applyLocalChange, applyRemoteChange, getCurrentVersion };
}
