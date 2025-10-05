import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IModalView } from "../../types";

export class ModalView extends Component<IModalView> {
    protected contentElement: HTMLElement;
    protected closeButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement) {
        super(container);
    
        const content = this.container.querySelector<HTMLElement>('.modal__content');
        if (!content) throw new Error('.modal__content не найден');
        this.contentElement = content;
    
        const close = this.container.querySelector<HTMLButtonElement>('.modal__close');
        if (!close) throw new Error('.modal__close не найден');
        this.closeButton = close;
    
        this.closeButton.addEventListener('click', this.close.bind(this));

        this.container.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    }

    set content(element: HTMLElement) {
        this.contentElement.replaceChildren(element);
    }

    open() {
        this.container.classList.add('modal_active');
    }

    close() {
        this.container.classList.remove('modal_active');
    }
}