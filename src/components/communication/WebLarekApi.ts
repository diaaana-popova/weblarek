import { IApi, IProduct, IProductResponse, IOrderRequest } from "../../types";

export class WebLarekApi {
    private baseApi: IApi;

    constructor(baseApi: IApi) {
        this.baseApi = baseApi;
    }

    async fetchProducts(): Promise<IProduct[]> {
        const result = await this.baseApi.get<IProductResponse>('/product/');
        return result.items;
    }

    async createOrder(orderData: IOrderRequest) {
        const result = await this.baseApi.post('/order/', orderData, "POST");
        return result;
    }
}