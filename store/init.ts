import { store } from '@store/index'
import { fetchUserInfo } from '@store/slices/userSlice'

export function initAuth(store: store) {
    const token = localStorage.getItem('accessToken')
    if (token) {
        store.dispatch(fetchUserInfo()) // saga will call API /me with token
    }
}
