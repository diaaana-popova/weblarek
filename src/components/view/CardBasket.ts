import { IEvents } from "../base/Events";
import { CardBaseView } from "./CardBase";
import { ensureElement } from "../../utils/utils";


export class CardBasketView extends CardBaseView {
    protected itemNumber: HTMLElement;
    protected deleteButton: HTMLButtonElement;
    protected events: IEvents
    
    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template);
        
        this.events = events;
        this.itemNumber = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        this.deleteButton.addEventListener('click', () => this.events.emit('basket:changed', { card: this.cardId }));
    }
    
    set counter(counter: number) {
        this.itemNumber.textContent = `${counter}`;
    }
}