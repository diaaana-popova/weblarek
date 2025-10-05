import { CDN_URL } from "../../utils/constants";
import { IEvents } from "../base/Events";
import { CardBaseView } from "./CardBase";
import { categoryMap } from "../../utils/constants";

export class CardGalleryView extends CardBaseView {
    protected cardCategory: HTMLElement;
    protected cardImg: HTMLImageElement;
    protected events: IEvents;
    
    constructor(template: HTMLTemplateElement, events: IEvents) {
        const node = template.content.firstElementChild?.cloneNode(true);
        if (!(node instanceof HTMLElement)) {
            throw new Error('В <template> нет корневого HTMLElement');
        }
        super(node);
        this.events = events;
        
        const category = this.container.querySelector<HTMLElement>('.card__category');
        if (!category) throw new Error('.card__category не найден');
        this.cardCategory = category;
        
        const image = this.container.querySelector<HTMLImageElement>('.card__image');
        if (!image) throw new Error('.card__image не найден');
        this.cardImg = image;

        this.container.addEventListener('click', () => {
            this.events.emit('card:open', { card: this.cardId } );
        });
    }

    setBackground() {
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