'use client'

import React from 'react'
import AuthLayout from '@components/layout/AuthLayout'
import ResetPasswordForm from '@features/auth/ResetPasswordForm'

const ResetPasswordPage: React.FC = () => {
    return (
        <div>
            <AuthLayout form={<ResetPasswordForm />} imgPath={'/images/reset_password.jpg'} title={'Reset Password'} />
        </div>
    )
}

export default ResetPasswordPage
