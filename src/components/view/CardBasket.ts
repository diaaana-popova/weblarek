import { IEvents } from "../base/Events";
import { CardBaseView } from "./CardBase";


export class CardBasketView extends CardBaseView {
    protected itemNumber: HTMLElement;
    protected deleteButton: HTMLButtonElement;
    protected events: IEvents
    
    constructor(template: HTMLTemplateElement, events: IEvents) {
        const node = template.content.firstElementChild?.cloneNode(true);
        if (!(node instanceof HTMLElement)) {
            throw new Error('В <template> нет корневого HTMLElement');
        }
        super(node);
        this.events = events;
        
        const index = this.container.querySelector<HTMLElement>('.basket__item-index');
        if (!index) throw new Error('.basket__item-index не найден');
        this.itemNumber = index;

        const button = this.container.querySelector<HTMLButtonElement>('.basket__item-delete');
        if (!button) throw new Error('.basket__item-delete не найден');
        this.deleteButton = button;

        this.deleteButton.addEventListener('click', () => this.deleteCard());
    }
    
    set counter(counter: number) {
        this.itemNumber.textContent = `${counter}`;
    }
    
    deleteCard(): void {
        this.events.emit('basket:changed', { card: this.cardId });
        this.container.remove();
    }
}