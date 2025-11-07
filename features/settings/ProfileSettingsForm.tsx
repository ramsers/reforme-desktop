import Button from '@components/button/button'
import SkeletonBlock from '@components/SkeletonBlock/SkeletonBlock'
import { AsyncResource } from '@reformetypes/common/ApiTypes'
import { User } from '@reformetypes/userTypes'
import { RootState } from '@store/index'
import { fetchUserInfo, updateUser } from '@store/slices/userSlice'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

const ProfileSettingsForm: React.FC = () => {
    const dispatch = useDispatch()
    const currentUser: AsyncResource<User | null> = useSelector((state: RootState) => state?.user?.currentUser)

    const ProfileSettingsSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
            .notRequired(),
    })

    useEffect(() => {
        if (!currentUser) {
            dispatch(fetchUserInfo())
        }
    }, [currentUser])

    const defaultHiddenPassword = '*********'

    return (
        <>
            {!currentUser.hasFetched ? (
                <SkeletonBlock className="w-1/3" />
            ) : (
                <Formik
                    initialValues={{
                        id: currentUser?.data?.id || '',
                        name: currentUser?.data?.name || '',
                        email: currentUser?.data?.email || '',
                        phoneNumber: currentUser?.data?.phoneNumber || '',
                        password: defaultHiddenPassword,
                    }}
                    validationSchema={ProfileSettingsSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        const { password, ...rest } = values
                        dispatch(updateUser((values.password === defaultHiddenPassword && rest) || values))
                    }}
                    enableReinitialize
                >
                    {({ isValid }) => (
                        <Form className="flex max-w-lg flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <Field
                                    name="name"
                                    type="text"
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                />
                                <ErrorMessage name="name" component="div" className="text-sm text-red-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <Field
                                    name="email"
                                    type="text"
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                />
                                <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone number</label>
                                <Field
                                    name="phoneNumber"
                                    type="text"
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                />
                                <ErrorMessage name="phoneNumber" component="div" className="text-sm text-red-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                >
                                    {({ field, form }) => (
                                        <input
                                            {...field}
                                            type="password"
                                            className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                            onKeyDown={(e) => {
                                                const defaultHiddenPassword = '*********'
                                                if (
                                                    e.key === 'Backspace' &&
                                                    form.values.password === defaultHiddenPassword
                                                ) {
                                                    e.preventDefault()
                                                    form.setFieldValue('password', '')
                                                }
                                            }}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
                            </div>

                            <div className="flex flex-row gap-2">
                                <Button type={'submit'} text="Save" className="w-full" disabled={!isValid} />
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    )
}

export default ProfileSettingsForm
