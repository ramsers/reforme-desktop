'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AppDispatch, RootState } from '@store/index'
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import * as Yup from 'yup'
import { eRole, SignUpPayload } from '@reformetypes/authTypes'
import { signUp } from '@store/slices/signUpSlice'
import { useRouter } from 'next/navigation'
import AppRoutes from '../../config/appRoutes'

type SignUpFormOwnProps = {}

type SignUpFormProps = SignUpFormOwnProps

const SignUpForm: React.FC<SignUpFormProps> = () => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
            .notRequired(),
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
                        onSuccess: () => router.push(AppRoutes.home),
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
                            <label className="font-semibold">Phone Number (optional)</label>
                            <Field
                                name="phoneNumber"
                                className="border-brown-default w-full rounded-lg border border-2 p-2"
                            />
                            <ErrorMessage name="phoneNumber" component="div" className="text-sm text-red-500" />
                        </div>

                        <button
                            type="submit"
                            className="bg-brown-default text-main hover:bg-brown-50 rounded-lg p-4 font-semibold transition-colors"
                            // onClick={() => handleSubmit()}
                        >
                            {/*    type="submit"*/}
                            {/*    // disabled={isSubmitting}*/}
                            {/*    className="bg-blue-600 text-white px-4 py-2 rounded"*/}
                            {/*>*/}
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
            <div className="flex flex-row gap-1">
                <p>Already have an account?</p>
                <button
                    onClick={() => router.push(AppRoutes.authenticate.login)}
                    className="cursor-pointer text-blue-600 underline"
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default SignUpForm
