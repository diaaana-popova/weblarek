import { CDN_URL } from "../../utils/constants";
import { IEvents } from "../base/Events";
import { CardBaseView } from "./CardBase";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";

export class CardGalleryView extends CardBaseView {
    protected cardCategory: HTMLElement;
    protected cardImg: HTMLImageElement;
    protected events: IEvents;
    
    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template);

        this.events = events;
        this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
        this.cardImg = ensureElement<HTMLImageElement>('.card__image', this.container);

        this.container.addEventListener('click', () => {
            this.events.emit('card:open', { card: this.cardId } );
        });
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

}