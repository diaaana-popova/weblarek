import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ProductCatalog {
    protected products: IProduct[];
    protected selectedId: string | null;
    protected events: IEvents;

    constructor(products: IProduct[] = [], events: IEvents) {
        this.products = products;
        this.selectedId = null;
        this.events = events;
    }

    set productsList(list: IProduct[]) {
        this.products = list;
        this.events.emit('catalog:changed');
    }

    get productsList() {
        return this.products;
    }

    getProductById(itemId: string): IProduct | undefined {
        return this.products.find(product => product.id === itemId);
    }

    set selectedProductId(itemId: string | null) {
        if (!itemId) {
            this.selectedId = null;
            return;
        }

        const selectedProduct = this.getProductById(itemId);
        if (selectedProduct) {
            this.selectedId = itemId;
        }

        this.events.emit('card:selected');
    }

    get selectedProduct(): IProduct | null {
        if (!this.selectedId) {
            return null;
        }
            return this.products[this.selectedId] ?? null;
    }
}
