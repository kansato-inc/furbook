declare module "better-sqlite3" {
  interface ISqlite {
    prepare(sql: string): IStatement;
    pragma(cmd: string): unknown;
    exec(sql: string): void;
    close(): void;
  }

  interface IStatement {
    run(...bind: unknown[]): { changes: number; lastInsertRowid: number };
    get<T = unknown>(...bind: unknown[]): T | undefined;
    all<T = unknown>(...bind: unknown[]): T[];
    iterate<T = unknown>(...bind: unknown[]): IterableIterator<T>;
  }

  class Database implements ISqlite {
    constructor(filename: string | Buffer, options?: unknown);
    prepare(sql: string): IStatement;
    pragma(cmd: string): unknown;
    exec(sql: string): void;
    close(): void;
    readonly open: boolean;
    readonly name: string;
    readonly inTransaction: boolean;
    memoryUsage(): number;
    loadExtension(path: string): this;
    function(name: string, fn: (...args: unknown[]) => unknown): void;
    aggregate(
      name: string,
      options?: { start: () => unknown; step: (total: unknown, ...args: unknown[]) => unknown; result: (total: unknown) => unknown },
    ): void;
    createTable(name: string, columns: Record<string, string>): Database;
    insert(table: string, data: Record<string, unknown>): Database;
    transaction<T>(fn: () => T): T;
    defaultSafeIntegers(on?: boolean): Database;
  }

  export default Database;
}
