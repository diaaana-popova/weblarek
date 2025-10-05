import { Component } from "../base/Component";

export interface ICardBase {
    id: string;
    title: string;
    price: number | null;
    category: string;
    src: string;
    alt?: string;
    description: string;
}

export class CardBaseView extends Component<ICardBase> {
    protected cardTitle: HTMLElement;
    protected cardPrice: HTMLElement;
    
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
}