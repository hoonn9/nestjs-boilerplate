export type PickKeyType<T, KeyType> = {
  [K in keyof T]: T[K] extends KeyType ? K : never;
}[keyof T];
