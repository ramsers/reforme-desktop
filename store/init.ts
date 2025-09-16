import {store} from "@store/index"
import {fetchUser} from "@store/slices/userSlice"

export function initAuth(store: store) {
    const token = localStorage.getItem("accessToken");
    if (token) {
        store.dispatch(fetchUser()); // saga will call API /me with token
    }
}
