import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
    private products: IProduct[];
    private events: IEvents;

    constructor(products: IProduct[] = [], events: IEvents) {
        this.products = products;
        this.events = events;
    }

    set productsList(list: IProduct[]) {
        this.products = list;
        this.events.emit('cart:changed');
    }

    get cartProducts(): IProduct[] {
        return this.products;
    }

    addProduct(productData: IProduct): void {
        this.products = [productData, ...this.products];
        this.events.emit('cart:changed');
    }

    deleteProduct(productId: string): void {
        this.products = this.products.filter(product => product.id !== productId);
        this.events.emit('cart:changed');
    }
    
    clearCart(): void {
        this.products = [];
        this.events.emit('cart:changed');
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
