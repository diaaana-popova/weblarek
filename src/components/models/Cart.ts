import { IProduct } from "../../types";

export class Cart {
    private products: IProduct[];

    constructor(products: IProduct[] = []) {
        this.products = products;
    }

    set productsList(list: IProduct[]) {
        this.products = list;
    }

    get cartProducts(): IProduct[] {
        return this.products;
    }

    addProduct(productData: IProduct): void {
        this.products = [productData, ...this.products];
    }

    deleteProduct(productId: string): void {
        this.products = this.products.filter(product => product.id !== productId);
    }
    
    clearCart(): void {
        this.products = [];
    }

    totalPrice(cart: IProduct[]): number {
        return cart.map(product => product.price).reduce((sum, price) => (sum ?? 0) + (price ?? 0), 0) ?? 0;
    }

    get cartQuantity(): number {
        return this.products.length;
    }

    checkAvailability(productId: string): boolean {
        if ((this.products.filter(product => product.id === productId)).length === 0) {
            return false
        } else {
            return true
        }
    }
}
