export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProductResponse {
    total: number;
    items: IProduct[];
}

export interface IOrderRequest {
    payment: 'card' | 'cash';
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export interface IProduct {
    id: string;
    image: string;
    title: string;
    category: string;
    price: number | null
}

export interface IBuyer {
    payment: 'card' | 'cash' | '';
    email: string;
    phone: string;
    address: string
}

export interface IHeaderView {
    counter: number;
}

export interface IModalView {
    isOpen: boolean;
    content: HTMLElement;
}

export interface IGalleryView {
    catalog: HTMLElement[];
}

export interface ICardBase {
    id: string;
    title: string;
    price: number | null;
    category: string;
    src: string;
    alt?: string;
    description: string;
}

export interface IBasketView {
    list: HTMLElement[];
    price: number;
}

export interface IOrderFormView {
    isValid: boolean;
    inputValues: Record<string, string>;
    errors: Record<string, string>;
}

export interface ISuccessContentView {
    total: number;
}