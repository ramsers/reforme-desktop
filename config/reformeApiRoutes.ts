const APIRoutes = {
    AUTH: {
        SIGN_UP: '/authentication/sign-up',
        LOGIN: '/authentication/login',
    },
    CLASSES: {
        LIST: (filter?: string) => `/classes?${filter}`
    }
}

export default APIRoutes;
