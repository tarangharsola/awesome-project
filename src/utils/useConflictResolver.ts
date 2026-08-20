import { Dispatch } from 'react';
import type { EditorAction, EditorState } from '../store/editorReducer';

/**
 * Simple versioned conflict resolver.
 * Each local edit increments a monotonically increasing version number.
 * Remote edits carry the version they were generated with.
 * The reducer applies a remote edit only if its version is newer than the current state version.
 */
export function createConflictResolver(dispatch: Dispatch<EditorAction>) {
  let localVersion = 0;

  return {
    generateLocalChange: (delta: string) => {
      localVersion += 1;
      dispatch({ type: 'LOCAL_CHANGE', payload: { delta, version: localVersion } });
    },
    applyRemoteChange: (delta: string, version: number) => {
      if (version > localVersion) {
        localVersion = version;
        dispatch({ type: 'REMOTE_CHANGE', payload: { delta, version } });
      } else {
        // Stale remote change – ignore to prevent rollback.
        console.debug('Ignored stale remote change', { remoteVersion: version, localVersion });
      }
    },
    getCurrentVersion: () => localVersion,
  };
}
