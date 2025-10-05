import { IBuyer } from "../../types";

export class Buyer {
    private buyer: IBuyer;

    constructor() {};

    set _payment(paymentType: 'card' | 'cash' | '') {
        this.buyer.payment = paymentType;
    }

    set _email(email: string) {
        this.buyer.email = email;
    }

    set _phone(phone: string) {
        this.buyer.phone = phone;
    }

    set _address(address: string) {
        this.buyer.address = address;
    }

    get buyerData(): IBuyer {
        return this.buyer;
    }
    
    clearBuyerData(): void {
        this.buyer.payment = '';
        this.buyer.email = '';
        this.buyer.phone = '';
        this.buyer.address = '';
    }

    buyerDataValidation(): boolean {
        if ((this.buyer.payment === '') || (this.buyer.email === '') || (this.buyer.phone === '') || (this.buyer.address === '')) {
            return false;
        } else {
            return true;
        }
    }
}