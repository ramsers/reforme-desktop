'use client'

import React from 'react'
import SignUpForm from '@features/auth/SignUpForm'
import AuthLayout from '@components/layout/AuthLayout'

const SignUpPage: React.FC = () => {
    return (
        <div>
            <AuthLayout title={'Sign Up'} form={<SignUpForm />} imgPath={'/images/signup_side_img.jpg'} />
        </div>
    )
}

export default SignUpPage
