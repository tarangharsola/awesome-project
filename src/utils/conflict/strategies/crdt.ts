/**
 * Simple sequence CRDT (RGA – Replicated Growable Array) implementation for text.
 * Each character is stored with a unique identifier (siteId + counter).
 * Operations are insert and delete. The algorithm guarantees convergence
 * without central coordination.
 */

type SiteId = string;

type CharId = { site: SiteId; counter: number };

type Char = { id: CharId; value: string; visible: boolean };

export class TextCRDT {
  private siteId: SiteId;
  private counter: number = 0;
  private sequence: Char[] = [];

  constructor(siteId: SiteId, initial?: string) {
    this.siteId = siteId;
    if (initial) {
      for (const ch of initial) this.localInsert(ch, this.sequence.length);
    }
  }

  private nextId(): CharId {
    this.counter += 1;
    return { site: this.siteId, counter: this.counter };
  }

  // Local insert returns the operation to broadcast
  public localInsert(value: string, index: number) {
    const id = this.nextId();
    const char: Char = { id, value, visible: true };
    this.sequence.splice(index, 0, char);
    return { type: 'insert', char } as const;
  }

  public localDelete(index: number) {
    const char = this.sequence[index];
    if (!char) return null;
    char.visible = false;
    return { type: 'delete', id: char.id } as const;
  }

  // Apply remote operation (insert/delete) ensuring total order by id
  public applyRemote(op: any) {
    if (op.type === 'insert') {
      const { char } = op;
      // Find correct position using identifier ordering
      let pos = 0;
      while (pos < this.sequence.length && this.compareIds(this.sequence[pos].id, char.id) < 0) {
        pos++;
      }
      this.sequence.splice(pos, 0, { ...char, visible: true });
    } else if (op.type === 'delete') {
      const { id } = op;
      const idx = this.sequence.findIndex((c) => this.compareIds(c.id, id) === 0);
      if (idx !== -1) this.sequence[idx].visible = false;
    }
  }

  // Helper to compare two CharIds deterministically
  private compareIds(a: CharId, b: CharId): number {
    if (a.counter !== b.counter) return a.counter - b.counter;
    return a.site < b.site ? -1 : a.site > b.site ? 1 : 0;
  }

  // Export current visible string
  public value(): string {
    return this.sequence.filter((c) => c.visible).map((c) => c.value).join('');
  }
}
