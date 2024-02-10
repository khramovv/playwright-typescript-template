import { apiTests as test } from 'tests/base/api.base.tests';
import { expect } from '@playwright/test';
import { validateStatusCode } from 'core.api/utils/assertions';
import { Product } from 'core.api/contracts/entities/product';

/** 
 * ============================================
 * Suite Name: 'Products Tests'
 * ============================================
 */
test.describe('Products Tests @API @Products', async () => {

  test.beforeEach(async ({ productsClient }) => {
    // --- Here you can do some preparation steps ---
  });

  test.afterEach(async ({ productsClient }) => {
    // --- Here you can do some clean up steps ---
  });

  /**
   * Test Name: 'Post Product'
      Steps:
      1. Create Product via POST /product endpoint with body {
            title: "iPhone 100",
            description: "An apple mobile which is nothing like apple",
            price: 1000,
            rating: 5.00,
            stock: 100,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
            images: []
          }
      2. Verify that status code is 200
      3. Verify that id in response message is not null
      4. Verify that return response message is equal to expected (similar like in step 1 + id property)
    */
  test('Post Product @Sanity', async ({ productsClient }) => {
      const body: Product = {
          title: 'iPhone 100',
          description: 'An apple mobile which is nothing like apple',
          price: 1000,
          rating: 5.00,
          stock: 100,
          brand: 'Apple',
          category: 'smartphones',
          thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
          images: []
        }
      const response = await productsClient.postProduct(body);

      await validateStatusCode(response, 200);

      const responseBody: Product = JSON.parse(await response.text());

      expect.soft(responseBody.id, `Product Id '${responseBody.id}' to be not null`).not.toBeNull();

      body.id = responseBody.id;

      expect.soft(responseBody, `Response body '${JSON.stringify(responseBody)}' to be equal expected '${JSON.stringify(body)}'`).toStrictEqual(body);
  });

  /**
   * Test Name: 'Get Products'
      Steps:
      1. Get Products via GET /products endpoint
      2. Verify that status code is 200
      3. Verify that Products array length in response message is greater than 0
    */
  test('Get Products @Sanity', async ({ productsClient}) => {
    const response = await productsClient.getProducts();

    await validateStatusCode(response, 200);

    const responseBody = await response.json();

    expect(responseBody.products.length, `Products length '${responseBody.products.length}' to be greater than 0`).toBeGreaterThan(0);
  });
});


