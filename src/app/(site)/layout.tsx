'use client'

import React from 'react'
import NavBar from '@components/navbar/NavBar'
import Footer from '@components/navbar/Footer'
import { useEffect } from 'react'
import Layout from '@components/layout/Layout'
import { useStore } from 'react-redux'
import { initAuth } from '@store/init'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    const store = useStore()
    useEffect(() => {
        initAuth(store)
    }, [store])

    return (
        <>
            <NavBar />
            <Layout>
                <div className="min-h-[65vh]">{children}</div>
            </Layout>
            <Footer />
        </>
    )
}
