export interface Dish {
    name: string;
    cuisine: string;
    type: string;
    category: string;
    ingredients: string[];
    quantity: number;
    ordered: number;
    price: number;
    description: string;
    images: string[];
    rating: number;
    reviews: {nick: string, name: string, body: string, date: string|null}[]
}