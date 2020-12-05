export interface BaseProduct {
    id: string,
    description: string,
    title: string,
    price: number
}

export interface Product extends BaseProduct {
    count: number
}
