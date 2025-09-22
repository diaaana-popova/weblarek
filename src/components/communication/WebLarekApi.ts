import { IProduct, IProductResponse, IOrderRequest } from "../../types";
import { Api } from "../base/Api";

export class WebLarekApi extends Api {
    constructor(baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
  }

    async fetchProducts(): Promise<IProduct[]> {
    const result = await this.get<IProductResponse>("/product/");
    return result.items;
  }

    async createOrder(orderData: IOrderRequest) {
    const result = await this.post("/order/", orderData, "POST");
    return result;
  }
}