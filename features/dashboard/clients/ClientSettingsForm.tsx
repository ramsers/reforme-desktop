import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { User } from '@reformetypes/userTypes'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { updateUser } from '@store/slices/userSlice'
import Button from '@components/button/button'

type ClientSettingsFormProps = {
    client: User
}

const ClientSettingsForm: React.FC<ClientSettingsFormProps> = ({ client }) => {
    const dispatch = useDispatch()

    const ClientSettingsSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
            .notRequired(),
    })

    return (
        <Formik
            initialValues={{
                id: client?.id || '',
                name: client?.name || '',
                email: client?.email || '',
                phoneNumber: client?.phoneNumber || '',
            }}
            validationSchema={ClientSettingsSchema}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(updateUser(values))
            }}
            enableReinitialize
        >
            {({ isSubmitting, handleSubmit }) => (
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

                    <div className="flex flex-row gap-2">
                        <Button type={'submit'} text="Delete" variant="danger" className="w-[50%]" />
                        <Button type={'submit'} text="Save" className="w-[50%]" onClick={() => handleSubmit()} />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ClientSettingsForm
