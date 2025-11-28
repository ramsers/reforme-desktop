'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
import { resetPassword } from '@store/slices/authSlice'
import Button from '@components/button/button'
import AppRoutes from 'config/appRoutes'

const ResetPasswordForm: React.FC = () => {
    const dispatch = useDispatch()
    const searchParams = useSearchParams()
    const router = useRouter()

    const token = searchParams.get('token')

    const ResetPasswordSchema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
    })

    const redirectOnSuccess = () => {
        router.push(AppRoutes.authenticate.login)
    }

    return (
        <div className="mx-auto w-full max-w-md p-6">
            <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validationSchema={ResetPasswordSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(
                        resetPassword({
                            password: values.password,
                            token: token || '',
                            onSuccess: redirectOnSuccess,
                        })
                    )
                    setSubmitting(false)
                }}
            >
                {({ isSubmitting, isValid, dirty }) => {
                    const canSubmit = isValid && dirty && !isSubmitting

                    return (
                        <Form className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium">New Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Enter new password"
                                    className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                />
                                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Confirm Password</label>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="mt-1 text-sm text-red-500"
                                />
                            </div>

                            <Button text="Reset Password" type="submit" disabled={!canSubmit} />
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default ResetPasswordForm
