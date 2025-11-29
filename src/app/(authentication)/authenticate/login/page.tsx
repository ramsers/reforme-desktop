'use client'

import React from 'react'
import LoginForm from '@features/auth/LoginForm'
import AuthLayout from '@components/layout/AuthLayout'

const LoginPage: React.FC = () => {
    return (
        <div>
            <AuthLayout form={<LoginForm />} imgPath={'/images/login_side_img.jpg'} title={'Login'} />
        </div>
    )
}

export default LoginPage
