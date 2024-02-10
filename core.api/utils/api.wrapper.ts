import { test, APIRequestContext, APIResponse } from '@playwright/test';
import { RequestMethods } from 'core.api/enums/request.methods';
import { getEnv } from 'environments';

export class ApiWrapper {
    constructor() {}
  
    public static async get(context: APIRequestContext, url: string, options?: any): Promise<APIResponse> {
        return this.request(context, url, RequestMethods.Get, options);
    }
  
    public static async post(context: APIRequestContext, url: string, options?: any): Promise<APIResponse> {
        return this.request(context, url, RequestMethods.Post, options);
    }

    public static async put(context: APIRequestContext, url: string, options?: any): Promise<APIResponse> {
        return this.request(context, url, RequestMethods.Put, options);
    }

    public static async delete(context: APIRequestContext, url: string, options?: any): Promise<APIResponse> {
        return this.request(context, url, RequestMethods.Delete, options);
    }

    public static async patch(context: APIRequestContext, url: string, options?: any): Promise<APIResponse> {
        return this.request(context, url, RequestMethods.Patch, options);
    }

    public static async request(context: APIRequestContext, url: string, method: RequestMethods, options?: any): Promise<APIResponse> {
        const message: string = `{ Method: '${method}', Url: ${getEnv().apiUrl}${url}, Options: ${JSON.stringify(options)} }`;

        return await test.step(message, async () => {
            console.debug(message);

            let response: APIResponse | any = undefined;

            switch (method){
                case RequestMethods.Get: {
                    response = await context.get(url, options);
                    break;
                }
                case RequestMethods.Post: {
                    response = await context.post(url, options);
                    break;
                }
                case RequestMethods.Put: {
                    response = await context.put(url, options);
                    break;
                }
                case RequestMethods.Delete: {
                    response = await context.delete(url, options);
                    break;
                }
                case RequestMethods.Patch: {
                    response = await context.patch(url, options);
                    break;
                }
            }

            console.debug(`{ Status: ${response.status()}, ResponseMessage: ${await response.text()}, Headers: ${response.headers()} }`);

            return response;
        });
    }
  }