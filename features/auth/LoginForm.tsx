import { RootState } from '@store/index'
import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { AppDispatch } from '@store/index'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Image from 'next/image'
import { eRole } from '@reformetypes/authTypes'
import { signUp, login } from '@store/slices/signUpSlice'
import { useRouter } from 'next/navigation'
import AppRoutes from '../../config/appRoutes'
import { User } from '@reformetypes/userTypes'
import App from 'next/app'

type LoginFormOwnProps = {}

type LoginFormSliceProps = {}

type LoginFormDispatchProps = {}

type LoginFormProps = LoginFormOwnProps & LoginFormSliceProps & LoginFormDispatchProps

const LoginForm: React.FC<LoginFormProps> = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)

    const router = useRouter()

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    })

    useEffect(() => {
        if (user?.currentUser?.role) {
            if (user.currentUser.role === eRole.ADMIN) {
                return router.push(AppRoutes.dashboard.main)
            } else {
                router.push(AppRoutes.home)
            }
        }
    }, [user.currentUser, router])

    return (
        <div className="flex flex-col gap-5">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const payload = {
                        ...values,
                    }
                    dispatch(login(payload))
                        .unwrap()
                        .then((user: User) => {
                            if (user.role === eRole.ADMIN) {
                                router.push(AppRoutes.dashboard.main)
                            } else {
                                router.push(AppRoutes.home)
                            }
                        })

                    setSubmitting(false)
                }}
            >
                {({ isSubmitting }) => (
                    <>
                        <Form className="flex w-full flex-col gap-4">
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
                            <button
                                type="submit"
                                className="bg-brown-default text-main hover:bg-brown-50 rounded-lg p-4 font-semibold transition-colors"
                            >
                                Login
                            </button>
                        </Form>
                    </>
                )}
            </Formik>
            <div className="flex flex-row gap-1">
                <p> Dont have an account?</p>
                <button
                    onClick={() => router.push(AppRoutes.authenticate.signUp)}
                    className="cursor-pointer text-blue-600 underline"
                >
                    Sign Up
                </button>
            </div>
        </div>
    )
}

export default LoginForm
