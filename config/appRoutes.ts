const AppRoutes = {
    home: '/',
    authenticate: {
        signUp: '/authenticate/signup',
        login: '/authenticate/login',
    },
    classes: { list: '/classes' },
    bookings: { list: '/bookings' },
    dashboard: {
        main: '/dashboard',
        classes: {
            list: '/dashboard/classes',
        },
        instructors: {
            list: '/dashboard/instructors',
        },
        bookings: {
            list: '/dashboard/bookings',
        },
        clients: {
            list: '/dashboard/clients',
            client: (id: string) => `/dashboard/clients/${id}`,
        },
    },
}

export default AppRoutes
