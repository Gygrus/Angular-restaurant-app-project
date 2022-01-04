export class Dish {
    constructor(
    public key: any,
    public name: string,
    public cuisine: string,
    public type: string,
    public category: string,
    public ingredients: string[],
    public quantity: number,
    public ordered: number,
    public price: number,
    public description: string,
    public images: string[],
    public ratingList: {uid: string, rating: number}[],
    public rating: number,
    public reviews: {nick: string, name: string, body: string, date: string|null}[]
    ) {}
}
