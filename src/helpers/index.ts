type TQueryParams = {
  categories?: string;
  brands?: string;
  price?: string;
  stock?: string;
  sort?: string;
  view?: string;
  search?: string;
};

export const paramsHandler = (
  newParam: TQueryParams,
  searchParams: URLSearchParams,
  setSearchParams: (params: TQueryParams) => void
) => {
  const params: TQueryParams = {};
  const categories = searchParams.get("categories");
  const brands = searchParams.get("brands");
  const price = searchParams.get("price");
  const stock = searchParams.get("stock");
  const sort = searchParams.get("sort");
  const view = searchParams.get("view");
  const search = searchParams.get("search");
  if (categories) params.categories = categories;
  if (brands) params.brands = brands;
  if (price) params.price = price;
  if (stock) params.stock = stock;
  if (sort) params.sort = sort;
  if (view) params.view = view;
  if (search) params.search = search;
  Object.assign(params, newParam);
  setSearchParams(params);
};

export const paramsReset = (
  setSearchParams: (params: TQueryParams) => void
) => {
  setSearchParams({});
};
