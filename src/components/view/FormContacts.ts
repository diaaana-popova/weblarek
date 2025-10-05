import { FormBase } from "./FormBase";
import { IEvents } from "../base/Events";

export class FormContacts extends FormBase {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;
    
    constructor(template: HTMLTemplateElement, events: IEvents) {
        const node = template.content.firstElementChild?.cloneNode(true);
        if (!(node instanceof HTMLElement)) {
            throw new Error('В <template> нет корневого HTMLElement');
        }
        super(node, events);

        const email = this.container.querySelector<HTMLInputElement>('input[name="email"]');
        if (!email) throw new Error('input[name="email"] не найден');
        this.emailInput = email;

        const phone = this.container.querySelector<HTMLInputElement>('input[name="phone"]');
        if (!phone) throw new Error('input[name="phone"] не найден');
        this.phoneInput = phone;

        this.emailInput.addEventListener('input', () => {
        this.clearErrors();
        this.toggleSubmit(this.validate());
        });

        this.phoneInput.addEventListener('input', () => {
        this.clearErrors();
        this.toggleSubmit(this.validate());
        }); 

        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const valid = this.validate();
            if (valid) {
                this.toggleSubmit(false);
                this.clearErrors();
                this.events.emit(`order:contacts`, this.getInputValues());
            }
        });
    }

    protected validate(): boolean {
        const errors: string[] = [];

        const emailCheck = this.emailInput.value.trim();
        const phoneCheck = this.phoneInput.value.trim();

        if (!emailCheck) {
            errors.push('Одно из полей не заполнено');
        }

        const emailOk = /^\S+@\S+\.\S+$/.test(emailCheck);
        if (emailCheck && !emailOk) {
            errors.push('Введён некорректный email');
        }

        const phoneOk = phoneCheck.replace(/\D/g, '');
        if (phoneCheck && phoneOk.length < 10) {
            errors.push('Введён некорректный номер телефона');
        }

        this.formErrors.textContent = errors.join(' | ');
        return errors.length === 0;
    }
}