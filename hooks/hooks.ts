import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/index'
import AppRoutes from 'config/appRoutes'
import { fetchUserInfo } from '@store/slices/userSlice'

export function useAuthGuard(requiredRole?: string) {
    const router = useRouter()
    const user = useSelector((state: RootState) => state.user.currentUser)
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const dispatch = useDispatch()

    useEffect(() => {
        if (!accessToken) {
            router.push(AppRoutes.authenticate.login)
            return
        }

        if (!user.data && accessToken) {
            dispatch(fetchUserInfo())
            return
        }

        if (requiredRole && user?.data?.role !== requiredRole) {
            router.push(AppRoutes.home)
        }
    }, [accessToken, user, router, requiredRole])
}
