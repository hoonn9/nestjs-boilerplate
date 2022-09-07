export type Identifier = string | number;
export type Optional<T> = T | null;

export type PickKeyType<T, KeyType> = {
  [K in keyof T]: T[K] extends KeyType ? K : never;
}[keyof T];
