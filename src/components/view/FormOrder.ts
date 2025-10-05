import { FormBase } from "./FormBase";
import { IEvents } from "../base/Events";

export class FormOrder extends FormBase {
    protected buttonCash: HTMLButtonElement;
    protected buttonCard: HTMLButtonElement;
    protected addressInput: HTMLInputElement;
    protected touched = {
        address: false,
        payment: false
    }
    
    constructor(template: HTMLTemplateElement, events: IEvents) {
        const node = template.content.firstElementChild?.cloneNode(true);
        if (!(node instanceof HTMLElement)) {
            throw new Error('В <template> нет корневого HTMLElement');
        }
        super(node, events);

        const cash = this.container.querySelector<HTMLButtonElement>('button[name="cash"]');
        if (!cash) throw new Error('button[name="cash"] не найден');
        this.buttonCash = cash; 

        const card = this.container.querySelector<HTMLButtonElement>('button[name="card"]');
        if (!card) throw new Error('button[name="card"] не найден');
        this.buttonCard = card; 

        const address = this.container.querySelector<HTMLInputElement>('input[name="address"]');
        if (!address) throw new Error('input[name="address"] не найден');
        this.addressInput = address;

        const submit = this.container.querySelector<HTMLButtonElement>('button[type="submit"]');
        if (!submit) throw new Error('button[type="submit"] не найден');
        this.submitButton = submit; 

        this.buttonCard.addEventListener('click', () => this.paymentMethod('card'));
        this.buttonCash.addEventListener('click', () => this.paymentMethod('cash'));

        this.addressInput.addEventListener('input', () => {
        this.clearErrors();
        this.toggleSubmit(this.validate());
        });

        this.submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.events.emit('order:continued');
        });
    }

    protected paymentMethod(payment: 'card' | 'cash') {
        this.buttonCard.classList.remove('button_alt-active');
        this.buttonCash.classList.remove('button_alt-active');

        if (payment === 'card') {
            this.buttonCard.classList.add('button_alt-active');
        } else {
            this.buttonCash.classList.add('button_alt-active');
        }

        this.clearErrors();
        this.toggleSubmit(this.validate());
    }

    protected validate(): boolean {
        const errors: string[] = [];

        if (this.addressInput.value.trim() === '') {
            errors.push('Адрес доставки не заполнен');
        }

        if (!this.buttonCard.classList.contains('button_alt-active') && !this.buttonCash.classList.contains('button_alt-active')) {
            errors.push('Не выбран метод оплаты');
        }

        this.formErrors.textContent = errors.join(' | ');
        return errors.length === 0;
    }

    
}