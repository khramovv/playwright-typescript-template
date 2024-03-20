import { test, APIResponse } from '@playwright/test';
import { APIClient } from 'core.api/clients/base/api.client';
import { RequestMethods } from 'core.api/enums/request.methods';

export class ApiWrapper {
    constructor() { }

    public static async get(client: APIClient, url: string, options?: any): Promise<APIResponse> {
        return this.request(client, url, RequestMethods.Get, options);
    }

    public static async post(client: APIClient, url: string, options?: any): Promise<APIResponse> {
        return this.request(client, url, RequestMethods.Post, options);
    }

    public static async put(client: APIClient, url: string, options?: any): Promise<APIResponse> {
        return this.request(client, url, RequestMethods.Put, options);
    }

    public static async delete(client: APIClient, url: string, options?: any): Promise<APIResponse> {
        return this.request(client, url, RequestMethods.Delete, options);
    }

    public static async patch(client: APIClient, url: string, options?: any): Promise<APIResponse> {
        return this.request(client, url, RequestMethods.Patch, options);
    }

    public static async request(client: APIClient, url: string, method: RequestMethods, options?: any): Promise<APIResponse> {

        const message: string = `{ Method: '${method}', Url: ${url.includes('http') ? url : client.baseUrl + url}, Options: ${JSON.stringify(options)} }`;

        return await test.step(message, async () => {
            console.debug(message);

            let response: APIResponse | any = undefined;

            switch (method) {
                case RequestMethods.Get: {
                    response = await client.context.get(url, options);
                    break;
                }
                case RequestMethods.Post: {
                    response = await client.context.post(url, options);
                    break;
                }
                case RequestMethods.Put: {
                    response = await client.context.put(url, options);
                    break;
                }
                case RequestMethods.Delete: {
                    response = await client.context.delete(url, options);
                    break;
                }
                case RequestMethods.Patch: {
                    response = await client.context.patch(url, options);
                    break;
                }
            }

            console.debug(`{ Status: ${response.status()}, ResponseMessage: ${await response.text()}, Headers: ${JSON.stringify(response.headers())} }`);

            return response;
        });
    }
}