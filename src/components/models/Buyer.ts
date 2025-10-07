import { IBuyer } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
    private buyer: IBuyer;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
        this.buyer = {
            payment: '',
            email: '',
            phone: '',
            address: ''
        };
    };

    set payment(paymentType: 'card' | 'cash' | '') {
        this.buyer.payment = paymentType ?? '';
        this.events.emit('buyer:changed');
    }

    set email(email: string) {
        this.buyer.email = email ?? '';
        this.events.emit('buyer:changed');
    }

    set phone(phone: string) {
        this.buyer.phone = phone ?? '';
        this.events.emit('buyer:changed');
    }

    set address(address: string) {
        this.buyer.address = address ?? '';
        this.events.emit('buyer:changed');
    }

    get buyerData(): IBuyer {
        return this.buyer;
    }
    
    clearBuyerData(): void {
        this.buyer.payment = '';
        this.buyer.email = '';
        this.buyer.phone = '';
        this.buyer.address = '';
        this.events.emit('buyer:changed');
    }

    buyerDataValidation(): Record<keyof IBuyer, string> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};

        if (!this.buyer.payment) {
            errors.payment = 'Не указан способ оплаты';
        }

        if (!this.buyer.email) {
            errors.email = 'Не указан email';
        }

        if (!this.buyer.phone) {
            errors.phone = 'Не указан телефон';
        }

        if (!this.buyer.address) {
            errors.address = 'Не указан адрес';
        }

        return errors as Record<keyof IBuyer, string>;
    }

    isValid(): boolean {
        return Object.keys(this.buyerDataValidation()).length === 0;
    }
}