import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IBasketView } from "../../types";
import { ensureElement } from "../../utils/utils";


export class BasketView extends Component<IBasketView> {
    protected basketList: HTMLUListElement;
    protected basketButton: HTMLButtonElement;
    protected basketPrice: HTMLElement;
    protected events: IEvents;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template);

        this.events = events;
        this.basketList = ensureElement<HTMLUListElement>('.basket__list', this.container);
        this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.basketPrice = ensureElement<HTMLElement>('.basket__price', this.container);

        this.basketButton.addEventListener('click', () => {
            this.events.emit('order:start');
        })

        this.isEmpty();
        this.toggleSubmit(false);
    }

    set price(price: number) {
        this.basketPrice.textContent = `${price} синапсов`;
    }

    set list(list: HTMLElement[]) {
        if (list.length === 0) {
            this.isEmpty();
            this.toggleSubmit(false);
        } else {
            this.basketList.replaceChildren(...list);
            this.toggleSubmit(true);
        }
    }

    protected isEmpty() {
        this.basketList.innerHTML = '<p class="basket__empty">Корзина пуста</p>'
    }

    protected toggleSubmit(enabled: boolean) {
        this.basketButton.disabled = !enabled;
    }
}
