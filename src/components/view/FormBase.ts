import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IOrderFormView } from "../../types";


export class FormBase extends Component<IOrderFormView> {
    protected submitButton: HTMLButtonElement;
    protected formInputs: NodeListOf<HTMLInputElement>;
    protected formName: string;
    protected form: HTMLFormElement;
    protected formErrors: HTMLElement;
    protected events: IEvents;
    
    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.form = container instanceof HTMLFormElement
            ? container
            : (container.querySelector<HTMLFormElement>('.form') ?? (() => { throw new Error('.form не найден')})());

        this.formName = this.form.getAttribute('name') ?? 'form';

        const submit = this.container.querySelector<HTMLButtonElement>('button[type="submit"]');
        if (!submit) throw new Error('button[type="submit"] не найден');
        this.submitButton = submit; 

        const inputs = this.container.querySelectorAll<HTMLInputElement>('.form__input');
        this.formInputs = inputs;
        if (this.formInputs.length === 0) throw new Error('.form__input не найден');

        const error = this.container.querySelector<HTMLElement>('.form__errors');
        if (!error) throw new Error('.form__errors не найден');
        this.formErrors = error;
    }

    set inputValues(values: Record<string, string>) {
        this.formInputs.forEach((input) => {
			input.value = values[input.name] ?? '';
		});
    }

    protected getInputValues() {
        const values: Record<string, string> = {};
		this.formInputs.forEach((input) => {
			values[input.name] = input.value;
		});
		return values;
    }

    toggleSubmit(enabled: boolean) {
        this.submitButton.disabled = !enabled;
    }

    clearErrors() {
        this.formErrors.textContent = '';
    }
};