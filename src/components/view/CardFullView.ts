import { IEvents } from "../base/Events";
import { CardBaseView } from "./CardBase";
import { CDN_URL } from "../../utils/constants";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";


export class CardFullView extends CardBaseView {
    protected cardCategory: HTMLElement;
    protected cardImg: HTMLImageElement;
    protected cardDescription: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected events: IEvents;
    
    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template);

        this.events = events;
        this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
        this.cardImg = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.cardDescription = ensureElement<HTMLElement>('.card__text', this.container);
        this.basketButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.basketButton.addEventListener('click', () => {
            this.events.emit('card:buy', { card: this.cardId } );
        })
    }
    
    protected setBackground() {
        this.cardCategory.className = 'card__category';

        const keys = Object.keys(categoryMap);

        keys.forEach((element) => {
            if (this.cardCategory.textContent === element) {
                const el = categoryMap[element];
                this.cardCategory.classList.add(el);
            } 
        })
    }
    
    set category(category: string) {
        this.cardCategory.textContent = category;

        this.setBackground();
    }
    
    set image(image: string) {
        this.cardImg.src = `${CDN_URL}${image}`;
    }

    set description(description: string) {
        this.cardDescription.textContent = description;
    }

    disableButton() {
        this.basketButton.setAttribute('disabled', '');
        this.basketButton.textContent = 'Недоступно';
    }

    itemInBasket() {
        this.basketButton.textContent = 'Удалить из корзины';
    }
}