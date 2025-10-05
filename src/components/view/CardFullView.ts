import { IEvents } from "../base/Events";
import { CardBaseView } from "./CardBase";
import { CDN_URL } from "../../utils/constants";
import { ICardBase } from "./CardBase";
import { categoryMap } from "../../utils/constants";

// export interface ICardFullPreview {
//     category: string;
//     src: string;
//     alt?: string;
//     description: string;
// }

export class CardFullView extends CardBaseView {
    protected cardCategory: HTMLElement;
    protected cardImg: HTMLImageElement;
    protected cardDescription: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected events: IEvents;
    protected card: ICardBase;
    
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

        const description = this.container.querySelector<HTMLElement>('.card__text');
        if (!description) throw new Error('.card__text не найден');
        this.cardDescription = description;

        const button = this.container.querySelector<HTMLButtonElement>('.card__button');
        if (!button) throw new Error('.card__button не найден');
        this.basketButton = button;

        this.basketButton.addEventListener('click', () => {
            this.events.emit('card:buy', { card: this.cardId } );
        })
    }
    
    setBackground() {
        this.cardCategory.classList.remove('card__category_other');

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

//     не хватает реализации:
//     если товар находится в корзине, кнопка должна быть заменена на «Удалить из корзины»;
// при нажатии на кнопку «Удалить из корзины» товар удаляется из корзины;
// после нажатия кнопки модальное окно закрывается;
// если у товара нет цены, кнопка в карточке должна быть заблокирована и иметь название «Недоступно».
}