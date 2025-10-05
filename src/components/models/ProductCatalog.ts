import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ProductCatalog {
    protected products: IProduct[];
    protected itemsById: Map<string, IProduct>;
    protected selectedId: string | null;
    protected events: IEvents;

    constructor(products: IProduct[] = []) {
        this.products = products;
        this.itemsById = new Map(products.map(item => [item.id, item]));
        this.selectedId = null;
        // this.events = events;
    }

    set productsList(list: IProduct[]) {
        this.products = list;
        this.itemsById = new Map(list.map(item => [item.id, item]));
        // this.events.emit('cards:loaded');
    }

    get productsList() {
        return this.products;
    }

    getProductById(itemId: string): IProduct | undefined {
        return this.itemsById.get(itemId);
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
        // this.events.emit('card:selected');
    }

    get selectedProduct(): IProduct | null {
        if (!this.selectedId) {
            return null;
        }
            return this.itemsById.get(this.selectedId) ?? null;
        }
    }
