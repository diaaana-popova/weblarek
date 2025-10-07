import { Component } from "../base/Component";
import { IGalleryView } from "../../types";


export class GalleryView extends Component<IGalleryView> {
    constructor(protected container: HTMLElement) {
        super(container);
    }

    set catalog(elements: HTMLElement[]) {
        if (elements.length === 0) {
            this.container.textContent = "К сожалению, товары отсутствуют";
        } else {
            this.container.replaceChildren(...elements);
        }
    }
}

