export type Product = {
    id: string
    name: string
    description: string
    priceId: string
    priceAmount: number
    currency: string
    isSubscription: boolean
    durationDays: string
}

export type CreatePurchaseIntentPayload = {
    priceId: string
    productName: string
    isSubscription: boolean
    priceAmount: number
    currency: string
    durationDays: string
}

export type PurchaseIntentResponse = {
    isSubscription: boolean
    intentData: string
}

export type PassPurchase = {
    stripeProductId: string
    stripeCustomerId: string
    passName: string
    isSubscription: string
    active: boolean
    startDate: string
    endDate: string
}
