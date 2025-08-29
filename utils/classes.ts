export class Node {
  data: string;
  next: Node | null;
  prev: Node | null;

  constructor() {
    this.data = "";
    this.next = null;
    this.prev = null;
  }
}
