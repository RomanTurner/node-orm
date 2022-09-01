export type DBPrimitives = Record<string, string | number | boolean | null>;

export interface BaseReturn<T> {
  isError: boolean;
  message: string;
  data: Array<keyof T>;
}
