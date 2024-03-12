import { apiTests as test } from 'tests/base/api.base.tests';
import { expect } from '@playwright/test';
import { validateStatusCode } from 'core.api/utils/assertions';
import { Product } from 'core.api/contracts/entities/product';
import { TestLinkHelper } from 'utils/common/test.link.helper';

/** 
 * ============================================
 * Suite Name: 'Products Tests'
 * ============================================
 */
test.describe('Products Tests @API @Products', async () => {

  test.beforeEach(async ({ productsClient }) => {
    // --- Here you can do some preparation steps ---
  });

  test.afterEach(async ({ productsClient, testLinkClient }) => {
    // --- Here you can do some clean up steps ---
  });

  /**
   * Prerequisites Before All: Get TestLink Integration Data
   */
  test.beforeAll(async ({ testLinkClient }) => {
    // --- Here you can do some global preparation steps ---
    TestLinkHelper.getTestLinkIntegrationData();
  });

  test.afterAll(async ({ testLinkClient }) => {
    // --- Here you can do some global clean up steps ---
  });

  /**
   * Test Name: '[TC-1] Post Product'
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
  test('[TC-1] Post Product @Sanity', async ({ productsClient }) => {
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
   * Test Name: '[TC-2] Get Products'
      Steps:
      1. Get Products via GET /products endpoint
      2. Verify that status code is 200
      3. Verify that Products array length in response message is greater than 0
    */
  test('[TC-2] Get Products @Sanity', async ({ productsClient }) => {
    const response = await productsClient.getProducts();

    await validateStatusCode(response, 200);

    const responseBody = await response.json();

    expect(responseBody.products.length, `Products length '${responseBody.products.length}' to be greater than 0`).toBeGreaterThan(0);
  });

    /**
   * Test Name: '[TC-4] Get Products - Failed Test Example'
      Steps:
      1. Get Products via GET /products endpoint
      2. Verify that status code is 200
      3. Verify that Products array length in response message is less than 0
    */
      test('[TC-4] Get Products - Failed Test Example @Sanity', async ({ productsClient }) => {
        const response = await productsClient.getProducts();
    
        await validateStatusCode(response, 200);
    
        const responseBody = await response.json();
    
        expect(responseBody.products.length, `Products length '${responseBody.products.length}' to be less than 0`).toBeLessThan(0);
      });
});


