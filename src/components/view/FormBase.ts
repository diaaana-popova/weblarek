import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IOrderFormView } from "../../types";
import { ensureElement } from "../../utils/utils";
import { ensureAllElements } from "../../utils/utils";


export class FormBase extends Component<IOrderFormView> {
    protected submitButton: HTMLButtonElement;
    protected formInputs: HTMLInputElement[];
    protected formName: string;
    protected form: HTMLFormElement;
    protected formErrors: HTMLElement;
    protected events: IEvents;
    
    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.form = container instanceof HTMLFormElement
            ? container
            : ensureElement<HTMLFormElement>('.form', this.container);

        this.formName = this.form.getAttribute('name') ?? 'form';

        this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
        this.formInputs = ensureAllElements<HTMLInputElement>('.form__input', this.container);
        this.formErrors = ensureElement<HTMLElement>('.form__errors', this.container);
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

    set valid(enabled: boolean) {
        this.submitButton.disabled = !enabled;
    }

    set errors(data: Record<string, string> | string) {
        if (typeof data === 'string') {
            this.formErrors.textContent = data;
        } else {
            const message = Object.values(data)
            .filter(Boolean)
            .join(' | ');
        this.formErrors.textContent = message;
        }
    }
};