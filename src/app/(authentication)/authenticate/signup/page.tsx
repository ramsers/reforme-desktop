'use client'

import React, { Suspense } from 'react'
import SignUpForm from '@features/auth/SignUpForm'
import AuthLayout from '@components/layout/AuthLayout'

const SignUpPage: React.FC = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <AuthLayout title={'Sign Up'} form={<SignUpForm />} imgPath={'/images/signup_side_img.jpg'} />
            </Suspense>
        </div>
    )
}

export default SignUpPage
