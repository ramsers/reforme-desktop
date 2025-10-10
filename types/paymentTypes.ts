export type Product = {
    id: string
    name: string
    description: string
    priceId: string
    priceAmount: number
    currency: string
    isSubscription: boolean
}

export type CreatePurchaseIntentPayload = {
    priceId: string
    productName: string
    isSubscription: boolean
    priceAmount: number
    currency: string
}

export type PurchaseIntentResponse = {
    isSubscription: boolean
    intentData: string
}
