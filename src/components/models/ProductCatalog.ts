import { IProduct } from "../../types";

export class ProductCatalog {
    private products: IProduct[];
    private itemsById: Map<string, IProduct>;
    private selectedId: string | null;

    constructor(products: IProduct[] = []) {
        this.products = products;
        this.itemsById = new Map(products.map(item => [item.id, item]));
        this.selectedId = null;
    }

    set productsList(list: IProduct[]) {
        this.products = list;
        this.itemsById = new Map(list.map(item => [item.id, item]));
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
    }

    get selectedProduct(): IProduct | null {
        if (!this.selectedId) {
            return null;
        }
            return this.itemsById.get(this.selectedId) ?? null;
        }
    }
