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

    set _payment(paymentType: 'card' | 'cash' | '') {
        this.buyer.payment = paymentType ?? '';
        this.events.emit('buyer:changed');
    }

    set _email(email: string) {
        this.buyer.email = email ?? '';
        this.events.emit('buyer:changed');
    }

    set _phone(phone: string) {
        this.buyer.phone = phone ?? '';
        this.events.emit('buyer:changed');
    }

    set _address(address: string) {
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

    buyerDataValidation(): boolean {
        if ((this.buyer.payment === '') || (this.buyer.email === '') || (this.buyer.phone === '') || (this.buyer.address === '')) {
            return false;
        } else {
            return true;
        }
    }
}