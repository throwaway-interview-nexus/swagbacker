import * as moment from 'moment';

export interface Product {
    id: number;
    name: string;
    category: string;
    game: string;
    price: number;
    imageUrls: string[];
    goal: number;
    orders: number;
    start: string;
    expiry: string;
    description: string;
    status: string;
}
