'use client'

import { RootState } from '@store/index'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
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
