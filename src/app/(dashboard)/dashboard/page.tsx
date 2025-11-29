'use client'

import React from 'react'
import AppRoutes from 'config/appRoutes'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Page: React.FC = () => {
    const router = useRouter()

    useEffect(() => {
        router.replace(AppRoutes.dashboard.classes.list)
    }, [router])

    return null
}

export default Page
