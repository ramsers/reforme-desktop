const APIRoutes = {
    AUTH: {
        SIGN_UP: '/authentication/sign-up',
        LOGIN: '/authentication/login',
    },
    CLASSES: {
        MAIN: '/classes'
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
