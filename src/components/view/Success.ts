import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ISuccessContentView } from "../../types";
import { ensureElement } from "../../utils/utils";


export class SuccessView extends Component<ISuccessContentView> {
    protected successDescription: HTMLElement;
    protected successButton: HTMLButtonElement;
    protected events: IEvents;
    
    constructor(protected template: HTMLTemplateElement, events: IEvents) {
        super(template);
        this.events = events;

        this.successDescription = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.successButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.events.emit('order:finished');
        });
    }
    
    set price(price: number) {
        this.successDescription.textContent = `Списано ${price} синапсов`;
    }
}