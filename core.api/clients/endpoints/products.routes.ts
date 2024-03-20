export class ProductsAPIRoutes {
    public static Products = 'products';
    public static ProductsAdd = 'products/add';
    public static ProductsId = (id: string) => `products/${id}`;
  }