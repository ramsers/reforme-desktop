'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AppDispatch } from '@store/index'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { eRole } from '@reformetypes/authTypes'
import { signUp } from '@store/slices/authSlice'
import { useRouter, useSearchParams } from 'next/navigation'
import AppRoutes from '../../config/appRoutes'
import Button from '@components/button/button'

const SignUpForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectUrl = searchParams.get('redirect') || AppRoutes.home

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
            .required('Phone number is required'),
    })

    return (
        <div className="flex flex-col gap-5">
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const payload = {
                        ...values,
                        phoneNumber: values.phoneNumber || '',
                        role: eRole.CLIENT,
                        onSuccess: () => router.push(redirectUrl),
                    }
                    dispatch(signUp(payload))

                    setSubmitting(false)
                }}
            >
                {({ isSubmitting, handleSubmit }) => (
                    <Form className="flex flex-col gap-4">
                        <div>
                            <label className="font-semibold">Name</label>
                            <Field name="name" className="border-brown-default w-full rounded-lg border border-2 p-2" />
                            <ErrorMessage name="name" component="div" className="text-sm text-red-500" />
                        </div>

                        <div>
                            <label className="font-semibold">Email</label>
                            <Field
                                name="email"
                                type="email"
                                className="border-brown-default w-full rounded-lg border border-2 p-2"
                            />
                            <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
                        </div>

                        <div>
                            <label className="font-semibold">Password</label>
                            <Field
                                name="password"
                                type="password"
                                className="border-brown-default w-full rounded-lg border border-2 p-2"
                            />
                            <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
                        </div>

                        <div>
                            <label className="font-semibold">Phone Number</label>
                            <Field
                                name="phoneNumber"
                                className="border-brown-default w-full rounded-lg border border-2 p-2"
                            />
                            <ErrorMessage name="phoneNumber" component="div" className="text-sm text-red-500" />
                        </div>

                        <Button type="submit" text="Submit" />
                    </Form>
                )}
            </Formik>
            <div className="flex flex-row gap-1">
                <p>Already have an account?</p>
                <Button onClick={() => router.push(AppRoutes.authenticate.login)} text="Login" variant="text" />
            </div>
        </div>
    )
}

export default SignUpForm
