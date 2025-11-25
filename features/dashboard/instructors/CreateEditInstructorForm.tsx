'use client'
import { RootState } from '@store/index'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { User } from '@reformetypes/userTypes'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { createUser, updateUser } from '@store/slices/userSlice'
import SlidingModal from '@components/slidingModal/SlidingModal'
import { eRole } from '@reformetypes/authTypes'
import { clearClass } from '@store/slices/classSlice'

type CreateEditInstructorFormOwnProps = {
    isOpen: boolean
    setIsOpen: (opened: boolean) => void
    title: string
    selectedInstructorId?: string | null
}

type CreateEditInstructorFormProps = CreateEditInstructorFormOwnProps

const CreateEditInstructorForm: React.FC<CreateEditInstructorFormProps> = ({
    isOpen,
    setIsOpen,
    title,
    selectedInstructorId,
}) => {
    const dispatch = useDispatch()

    const instructor: User | null = useSelector(
        (state: RootState) =>
            (state?.user?.instructors?.data.results.length &&
                state?.user?.instructors.data.results.find((inst) => inst.id === selectedInstructorId)) ||
            null
    )

    const InstructorSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
            .notRequired(),
    })
    return (
        <div className="flex flex-col gap-5">
            <Formik
                initialValues={{
                    id: instructor?.id || '',
                    name: instructor?.name || '',
                    email: instructor?.email || '',
                    phoneNumber: instructor?.phoneNumber || '',
                }}
                validationSchema={InstructorSchema}
                onSubmit={(values, { resetForm }) => {
                    const { id, ...payload } = values

                    if (!values.id) {
                        dispatch(createUser({ ...payload, role: eRole.INSTRUCTOR }))
                    } else {
                        dispatch(updateUser(values))
                    }

                    setIsOpen(false)
                    resetForm()
                }}
                enableReinitialize
            >
                {({ isSubmitting, handleSubmit, isValid, resetForm }) => (
                    <SlidingModal
                        title={title}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        content={'Save'}
                        onClick={handleSubmit}
                        isValid={isValid}
                        onClose={() => {
                            setIsOpen(false)
                            dispatch(clearClass())
                            resetForm()
                        }}
                        isSubmitting={isSubmitting}
                    >
                        <Form className="flex flex-col gap-4">
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
                                    type="email"
                                    name="email"
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
                        </Form>
                    </SlidingModal>
                )}
            </Formik>
        </div>
    )
}

export default CreateEditInstructorForm
