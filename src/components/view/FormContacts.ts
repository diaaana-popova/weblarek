import { FormBase } from "./FormBase";
import { IEvents } from "../base/Events";

export class FormContacts extends FormBase {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;
    protected touched = {
        email: false,
        phone: false
    }
    
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

        const touched = (field: 'email' | 'phone') => {
            if (!this.touched[field] && (field === 'email' ? this.emailInput.value : this.phoneInput.value).trim().length > 0) {
            this.touched[field] = true;
        }
        this.clearErrors();
        this.toggleSubmit(this.validate());
        };

        this.emailInput.addEventListener('input', () => { touched('email') });
        this.phoneInput.addEventListener('input', () => { touched('phone') });

        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.touched.email = true;
            this.touched.phone = true;
            const valid = this.validate();
            if (valid) {
                this.events.emit(`${this.formName}:submit`, this.getInputValues());
            }
        });
    }

    protected getInputValues() {
        const values: Record<string, string> = {};
		this.formInputs.forEach((input) => {
			values[input.name] = input.value;
		});
		return values;
    }

    protected validate(): boolean {
        const errors: string[] = [];

        const emailCheck = this.emailInput.value.trim();
        const phoneCheck = this.phoneInput.value.trim();

        if (!emailCheck && this.touched.email || !phoneCheck && this.touched.phone) {
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