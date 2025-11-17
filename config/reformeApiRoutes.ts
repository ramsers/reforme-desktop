const APIRoutes = {
    AUTH: {
        SIGN_UP: '/authentication/sign-up',
        LOGIN: '/authentication/login',
        FORGOT_PASSWORD: '/authentication/forgot-password',
    },
    CLASSES: {
        MAIN: '/classes',
        BY_ID: (id: string) => `/classes/${id}`,
        PARTIAL_UPDATE: (id: string) => `/classes/${id}`,
        DELETE: (id: string) => `/classes/${id}/delete`,
    },
    USER: {
        MAIN: '/users',
        ME: '/users/me',
        ALL_INSTRUCTORS: '/users/all-instructors',
        ALL_CLIENTS: '/users/all-clients',
        BY_ID: (id: string) => `/users/${id}`,
    },
    BOOKING: {
        MAIN: '/bookings',
        DELETE: (id: string) => `/bookings/${id}/delete`,
    },
    PAYMENT: {
        PAYMENT_INTENT: '/payment/create-purchase-intent',
        LIST_PRODUCTS: 'payment/products',
        CANCEL_SUBSCRIPTION: (id: string) => `payment/subscription/${id}/cancel`,
    },
}

export default APIRoutes
