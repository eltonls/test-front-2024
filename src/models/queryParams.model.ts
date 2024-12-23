class QueryParams {
  constructor(
    public nome?: string,
    public matricula?: string,
    public idade_gte?: number,
    public idade_lte?: number,
    public cargo?: string,
    public tipo?: number,
    public size?: number,
    public page?: number
  ) {}
}

export default QueryParams;
