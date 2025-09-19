const AppRoutes = {
    home: '/',
    authenticate: {
        signUp: '/authenticate/signup',
        login: '/authenticate/login'
    },
    classes: {list: '/classes'},
    bookings: {list: '/bookings'},
    dashboard: {
        main: '/dashboard',
        classes: {
            list: '/dashboard/classes'
        }
    }
}

export default AppRoutes
