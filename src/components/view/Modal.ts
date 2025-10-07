import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IModalView } from "../../types";
import { ensureElement } from "../../utils/utils";

export class ModalView extends Component<IModalView> {
    protected contentElement: HTMLElement;
    protected closeButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement) {
        super(container);

        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    
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