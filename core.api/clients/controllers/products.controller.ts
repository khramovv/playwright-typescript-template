import { test, APIRequestContext, APIResponse } from '@playwright/test';
import { ProductsAPIRoutes } from 'core.api/clients/endpoints/products.routes';
import { APIClient } from 'core.api/clients/base/api.client';
import { Product } from 'core.api/contracts/entities/product';
import { ApiWrapper } from 'core.api/utils/api.wrapper';
import { getEnv } from 'environments';

export class ProductsApiClient implements APIClient {
  constructor(public context: APIRequestContext, baseUrl?: string) { 
    this.baseUrl = baseUrl || getEnv().apiUrl;
  }

  baseUrl: string;

  async getProducts(): Promise<APIResponse> {
    return await test.step(`Get All Products`, async () => {
      return ApiWrapper.get(this, ProductsAPIRoutes.Products);
    });
  }

  async postProduct(data: Product): Promise<APIResponse> {
    return await test.step(`Create Product With Fields '${JSON.stringify(data)}'`, async () => {
      return ApiWrapper.post(this, ProductsAPIRoutes.ProductsAdd, { data });
    });
  }
}