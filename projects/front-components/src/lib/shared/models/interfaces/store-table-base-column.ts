export interface IStoreTableBase {
  id: string;
  readonly title: string;
  order: number;
  disableChange?: boolean;
}

export interface IStoreTableBaseColumn extends IStoreTableBase {
  /** @deprecated */
  readonly sort?: boolean | null;
  readonly sortType?: string | null;
  readonly width?: string | null;
  readonly align?: string | null;
}
