import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ICardBase } from "./CardBase";

export interface IBasketView {
    list: ICardBase[];
    price: number;
}

export class BasketView extends Component<IBasketView> {
    protected basketList: HTMLUListElement;
    protected basketButton: HTMLButtonElement;
    protected basketPrice: HTMLElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        const list = this.container.querySelector<HTMLUListElement>('.basket__list');
        if (!list) throw new Error('.basket__list не найден');
        this.basketList = list;

        const basket = this.container.querySelector<HTMLButtonElement>('.basket__button');
        if (!basket) throw new Error('.basket__button не найден');
        this.basketButton = basket;

        const price = this.container.querySelector<HTMLElement>('.basket__price');
        if (!price) throw new Error('.basket__price не найден');
        this.basketPrice = price;

        this.basketButton.addEventListener('click', () => {
            this.events.emit('order:start');
        })
    }

    set price(price: number) {
        this.basketPrice.textContent = `${price} синапсов`;
    }

    set list(list: HTMLUListElement) {
        this.basketList.replaceChildren(list);
    }

    toggleSubmit(enabled: boolean) {
        this.basketButton.disabled = !enabled;
    }
}
