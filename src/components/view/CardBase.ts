import { Component } from "../base/Component";
import { ICardBase } from "../../types";


export class CardBaseView extends Component<ICardBase> {
    protected cardTitle: HTMLElement;
    protected cardPrice: HTMLElement;
    protected cardId: string;
    
    constructor(protected container: HTMLElement) {
        super(container);
        
        const title = this.container.querySelector<HTMLElement>('.card__title');
        if (!title) throw new Error('.card__title не найден');
        this.cardTitle = title;
        
        const price = this.container.querySelector<HTMLElement>('.card__price');
        if (!price) throw new Error('.card__price не найден');
        this.cardPrice = price;
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