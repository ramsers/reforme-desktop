export type Product = {
    id: string
    name: string
    description: string
    priceId: string
    priceAmount: number
    currency: string
    isSubscription: boolean
}

export type CreateCheckoutSessionPayload = {
    priceId: string
    productName: string
    isSubscription: boolean
}
