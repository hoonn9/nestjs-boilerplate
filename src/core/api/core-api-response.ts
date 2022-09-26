export class CoreApiResponse<TData> {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly data: TData | null,
  ) {}
}
