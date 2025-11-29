'use client'

import React, { Suspense } from 'react'
import AuthLayout from '@components/layout/AuthLayout'
import ResetPasswordForm from '@features/auth/ResetPasswordForm'

const ResetPasswordPage: React.FC = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <AuthLayout
                    form={<ResetPasswordForm />}
                    imgPath={'/images/reset_password.jpg'}
                    title={'Reset Password'}
                />
            </Suspense>
        </div>
    )
}

export default ResetPasswordPage
