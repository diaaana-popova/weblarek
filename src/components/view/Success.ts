import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface ISuccessContentView {
    total: number;
}

export class SuccessView extends Component<ISuccessContentView> {
    protected successDescription: HTMLElement;
    protected successButton: HTMLButtonElement;
    protected events: IEvents;
    
    constructor(protected template: HTMLTemplateElement, events: IEvents) {
        const node = template.content.firstElementChild?.cloneNode(true);
        if (!(node instanceof HTMLElement)) {
            throw new Error('В <template> нет корневого HTMLElement');
        }
        super(node);
        this.events = events;
        
        const description = this.container.querySelector<HTMLElement>('.order-success__description');
        if (!description) throw new Error('.order-success__description не найден');
        this.successDescription = description;
        
        const button = this.container.querySelector<HTMLButtonElement>('.order-success__close');
        if (!button) throw new Error('.order-success__close не найден');
        this.successButton = button;

        this.successButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.events.emit('order:finished');
        });
    }
    
    set price(price: number) {
        this.successDescription.textContent = `Списано ${price} синапсов`;
    }
}