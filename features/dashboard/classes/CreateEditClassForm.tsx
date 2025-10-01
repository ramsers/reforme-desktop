'use client'

import { RootState } from '@store/index'
import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { eRole } from '@reformetypes/authTypes'
import AppRoutes from '../../../config/appRoutes'
import { signUp } from '@store/slices/signUpSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import SlidingModal from '@components/slidingModal/SlidingModal'
import { createClass, partialUpdateClass, clearClass } from '@store/slices/classSlice'
import { fetchAllInstructors } from '@store/slices/userSlice'
import { Class } from '@reformetypes/classTypes'
import { User } from '@reformetypes/userTypes'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'

type CreateEditClassFormOwnProps = {
    isOpen: boolean
    setIsOpen: (opened: boolean) => void
    title: string
}

type CreateEditClassFormSliceProps = {}

type CreateEditClassFormDispatchProps = {}

type CreateEditClassFormProps = CreateEditClassFormOwnProps &
    CreateEditClassFormSliceProps &
    CreateEditClassFormDispatchProps

const CreateEditClassForm: React.FC<CreateEditClassFormProps> = ({ isOpen, setIsOpen, title }) => {
    const dispatch = useDispatch()
    const instructors: ShortPaginatedResponse<User> = useSelector((state: RootState) => state.user?.instructors)
    const currentClass: Class | null = useSelector((state: RootState) => state.class?.class)

    const ClassSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        size: Yup.number().required('Class size is required'),
        date: Yup.date().required('Class date is required'),
        instructorId: Yup.string().optional().nullable(),
    })

    useEffect(() => {
        dispatch(fetchAllInstructors({}))
    }, [dispatch])

    // console.log('TESTO =============', instructors)
    console.log('CURRENT CLASS =============', currentClass)

    return (
        <div className="flex flex-col gap-5">
            <Formik
                initialValues={{
                    id: currentClass?.id || '',
                    title: currentClass?.title || '',
                    description: currentClass?.description || '',
                    size: currentClass?.size || 15,
                    date:
                        (currentClass?.date && dayjs(currentClass.date).format('YYYY-MM-DD HH:mm')) ||
                        dayjs().format('YYYY-MM-DD HH:mm'),
                    instructorId: null,
                }}
                validationSchema={ClassSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const { id, ...payload } = values

                    if (values.id) {
                        console.log('hitting partial update=================', values)

                        dispatch(partialUpdateClass(values))
                    } else {
                        dispatch(createClass(payload))
                    }

                    setSubmitting(false)
                    setIsOpen(false)
                    resetForm()
                }}
                enableReinitialize
            >
                {({ isSubmitting, handleSubmit }) => (
                    <SlidingModal
                        title={title}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        content={'Save'}
                        onClick={handleSubmit}
                        onClose={() => {
                            setIsOpen(false)
                            dispatch(clearClass())
                        }}
                    >
                        <Form className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <Field
                                    name="title"
                                    type="text"
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                />
                                <ErrorMessage name="title" component="div" className="text-sm text-red-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    rows={3}
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Size</label>
                                <Field
                                    name="size"
                                    type="number"
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                />
                                <ErrorMessage name="size" component="div" className="text-sm text-red-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                <Field
                                    name="date"
                                    type="datetime-local"
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                />
                                <ErrorMessage name="date" component="div" className="text-sm text-red-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Instructor</label>
                                <Field
                                    as="select"
                                    name="instructorId"
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                >
                                    <option value="">Select instructor</option>
                                    {instructors?.results.map((instructor) => (
                                        <option value={instructor.id}>{instructor.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="instructorId" component="div" className="text-sm text-red-500" />
                            </div>
                        </Form>
                    </SlidingModal>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = (store: RootState): CreateEditClassFormSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): CreateEditClassFormDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditClassForm)
