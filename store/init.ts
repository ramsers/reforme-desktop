import { store } from '@store/index'
import { fetchUserInfo } from '@store/slices/userSlice'

export function initAuth(appStore: typeof store) {
    const token = localStorage.getItem('accessToken')
    if (token) {
        appStore.dispatch(fetchUserInfo()) // saga will call API /me with token
    }
}
