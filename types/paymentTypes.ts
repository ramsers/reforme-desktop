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
    id: string
    stripeProductId: string
    stripeCustomerId: string
    passName: string
    isSubscription: string
    isActive: boolean
    startDate: string
    endDate: string
    isCancelRequested: boolean | null
}
