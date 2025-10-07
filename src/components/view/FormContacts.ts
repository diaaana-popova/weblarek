import { FormBase } from "./FormBase";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class FormContacts extends FormBase {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;
    
    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template, events);

        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

        this.emailInput.addEventListener('input', () => {
            this.events.emit('order:field-changed', { field: 'email', value: this.emailInput.value.trim() });
        });

        this.phoneInput.addEventListener('input', () => {
            this.events.emit('order:field-changed', { field: 'phone', value: this.phoneInput.value.trim() });
        });

        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.events.emit(`order:contacts`);
            });
        };

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }
};