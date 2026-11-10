export class InMemoryRepository<T extends { id: number }> {
  // private storage
  private items: T[] = [];
  private findIdxById = (id: number): number => this.items.findIndex(it => it.id === id);

  add(entity: T): T {
    this.items.push(entity);
    return entity;
  }

  update(id: number, patch: Partial<T>): T {
    if (id == undefined || typeof(id) !== 'number')
        throw new Error(`id is ${id}`);

    const item = this.findById(id);
    if (!item)
        throw new Error("no entity with the given id exists");

    Object.assign(item, patch, { id });
    return item;
  }

  remove(id: number): void {
    if (id == undefined || typeof(id) !== 'number')
        throw new Error(`id is ${id}`);

    const item = this.findById(id);
    if (!item)
        throw new Error("no entity with the given id exists");
    
    this.items.splice(this.findIdxById(id), 1);
  }

  findById(id: number): T | undefined {
    if (id == undefined || typeof(id) !== 'number')
        throw new Error(`id is ${id}`);

    const result = this.items[this.findIdxById(id)];
    return (result) ? result : undefined;
  }

  findAll(): T[] {
    return [...this.items];
  }
}