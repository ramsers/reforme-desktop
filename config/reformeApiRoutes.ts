const APIRoutes = {
    AUTH: {
        SIGN_UP: '/authentication/sign-up',
        LOGIN: '/authentication/login',
    },
    CLASSES: {
        LIST: '/classes'
    },
    USER: {
        ME: '/users/me'
    },
    BOOKING: {
        MAIN: '/bookings',
        DELETE: (id: string) => `/bookings/${id}`
    }
}

export default APIRoutes;
