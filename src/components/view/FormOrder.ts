import { FormBase } from "./FormBase";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class FormOrder extends FormBase {
    protected buttonCash: HTMLButtonElement;
    protected buttonCard: HTMLButtonElement;
    protected addressInput: HTMLInputElement;
    
    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template, events);

        this.buttonCash = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.buttonCard = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);

        this.buttonCard.addEventListener('click', () => {
            this.paymentMethod = 'card';
            this.events.emit('order:field-changed', { field: 'payment', value: 'card' });
        });

        this.buttonCash.addEventListener('click', () => {
            this.paymentMethod = 'cash';
            this.events.emit('order:field-changed', { field: 'payment', value: 'cash' });
        });

        this.addressInput.addEventListener('input', () => {
            this.events.emit('order:field-changed', { field: 'address', value: this.addressInput.value.trim() });
        });

        this.submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.events.emit('order:continued');
        });
    }

    set paymentMethod(payment: 'card' | 'cash') {

        this.buttonCard.classList.remove('button_alt-active');
        this.buttonCash.classList.remove('button_alt-active');

        if (payment === 'card') {
            this.buttonCard.classList.add('button_alt-active');
        } else {
            this.buttonCash.classList.add('button_alt-active');
        }
    }

    set address(value: string) {
        this.addressInput.value = value;
    }
}
