export interface DatabaseHandler {
  drop(): Promise<void>;
}
