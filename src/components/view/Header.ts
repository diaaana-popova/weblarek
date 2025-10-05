import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IHeaderView {
    counter: number;
}

export class HeaderView extends Component<IHeaderView> {
    protected counterElement: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        const counter = this.container.querySelector<HTMLElement>('.header__basket-counter');
        if (!counter) throw new Error('.header__basket-counter не найден');
        this.counterElement = counter;

        const basket = this.container.querySelector<HTMLButtonElement>('.header__basket');
        if (!basket) throw new Error('.header__basket не найден');
        this.basketButton = basket;

        this.basketButton.addEventListener('click', () => this.events.emit('basket:open'));
    }

    set counter(value: number) {
        this.counterElement.textContent = `${value}`;
    }
}

