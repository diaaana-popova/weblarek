import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IHeaderView } from "../../types";
import { ensureElement } from "../../utils/utils";


export class HeaderView extends Component<IHeaderView> {
    protected counterElement: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);

        this.basketButton.addEventListener('click', () => this.events.emit('basket:open'));
    }

    set counter(value: number) {
        this.counterElement.textContent = `${value}`;
    }
}

