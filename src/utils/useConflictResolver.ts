import { useEffect } from 'react';
import * as Y from 'yjs';
import { EditorView } from '@codemirror/view';

/**
 * Binds a Yjs Text type to a CodeMirror editor view.
 * Synchronizes remote changes into the editor and local edits back to Yjs.
 */
export function useYjsBinding(view: EditorView, yText: Y.Text) {
  useEffect(() => {
    // Apply remote Yjs changes to the editor
    const remoteObserver = (event: Y.YTextEvent) => {
      view.dispatch({
        changes: event.delta.map(d => {
          if (d.insert) {
            return { from: d.index, insert: d.insert as string };
          } else if (d.delete) {
            return { from: d.index, to: d.index + d.delete };
          }
          return null;
        }).filter(Boolean) as any,
      });
    };
    yText.observe(remoteObserver);

    // Apply local editor changes to Yjs
    const localListener = view.state.field(EditorView.updateListener, false);
    const localObserver = (update: any) => {
      if (update.docChanged) {
        update.changes.iterChanges((fromA: number, toA: number, fromB: number, toB: number, inserted: any) => {
          const text = inserted.toString();
          yText.delete(fromA, toA - fromA);
          if (text) {
            yText.insert(fromA, text);
          }
        });
      }
    };
    view.dispatch({ effects: EditorView.updateListener.of(localObserver) });

    return () => {
      yText.unobserve(remoteObserver);
    };
  }, [view, yText]);
}
