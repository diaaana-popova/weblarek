import { Component } from "../base/Component";
import { ICardBase } from "../../types";
import { ensureElement } from "../../utils/utils";


export class CardBaseView extends Component<ICardBase> {
    protected cardTitle: HTMLElement;
    protected cardPrice: HTMLElement;
    protected cardId: string;
    
    constructor(protected container: HTMLElement) {
        super(container);

        this.cardTitle = ensureElement<HTMLElement>('.card__title', this.container);
        this.cardPrice = ensureElement<HTMLElement>('.card__price', this.container);
    }
    
    set title(title: string) {
        this.cardTitle.textContent = title;
    }
    
    set price(price: number | null) {
        if (typeof price === 'number') {
            this.cardPrice.textContent = `${price} синапсов`;
        } else {
            this.cardPrice.textContent = `Бесценно`;
        }
    }

    set id(id: string) {
        this.cardId = id;
    }

}