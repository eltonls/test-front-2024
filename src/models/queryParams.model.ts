class QueryParams {
  constructor(
    public nome?: string,
    public matricula?: string,
    public idade_gte?: number,
    public idade_lte?: number,
    public cargo?: string,
    public tipo?: number,
    public _limit?: number,
    public _page?: number
  ) {}
}

export default QueryParams;
