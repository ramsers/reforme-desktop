import { RootState } from '@store/index'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { eRole } from '@reformetypes/authTypes'
import { login } from '@store/slices/authSlice'
import { useRouter } from 'next/navigation'
import AppRoutes from '../../config/appRoutes'
import { User } from '@reformetypes/userTypes'
import Button from '@components/button/button'
import ForgotPasswordModal from './ForgotPasswordModal'

const LoginForm: React.FC = () => {
    const dispatch = useDispatch()
    const user: User | null = useSelector((state: RootState) => state?.user?.currentUser.data)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const router = useRouter()

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    })

    useEffect(() => {
        if (user?.role) {
            if (user.role === eRole.ADMIN) {
                return router.push(AppRoutes.dashboard.main)
            } else {
                router.push(AppRoutes.home)
            }
        }
    }, [user, router])

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
                    dispatch(login(payload) as any).then((res: any) => {
                        const user = res.payload

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
                            <Button type={'submit'} text="Login" />
                        </Form>
                    </>
                )}
            </Formik>
            <div className="flex flex-row gap-1">
                <p> Dont have an account?</p>
                <Button onClick={() => router.push(AppRoutes.authenticate.signUp)} variant="text" text="Sign Up" />
            </div>
            <div className="flex flex-row gap-1">
                <Button onClick={() => setIsOpen(true)} text="Forgot password?" variant="text" />
            </div>
            <ForgotPasswordModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    )
}

export default LoginForm
