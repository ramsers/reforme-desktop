'use client'

import { RootState } from '@store/index'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import SlidingModal from '@components/slidingModal/SlidingModal'
import { createClass, partialUpdateClass, clearClass } from '@store/slices/classSlice'
import { fetchAllInstructors } from '@store/slices/userSlice'
import { Class, eRecurrenceType } from '@reformetypes/classTypes'
import { User } from '@reformetypes/userTypes'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import utc from 'dayjs/plugin/utc'
import { AsyncResource } from '@reformetypes/common/ApiTypes'
dayjs.extend(utc)

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
    const instructors: AsyncResource<ShortPaginatedResponse<User>> = useSelector(
        (state: RootState) => state.user?.instructors
    )
    const currentClass: AsyncResource<Class | null> = useSelector((state: RootState) => state.class?.class)

    const ClassSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        size: Yup.number().required('Class size is required'),
        date: Yup.date().required('Class date is required'),
        instructorId: Yup.string().optional().nullable(),
        recurrenceType: Yup.mixed<eRecurrenceType>().oneOf(Object.values(eRecurrenceType)).nullable(),
        recurrenceDays: Yup.array()
            .of(Yup.number().min(0).max(6))
            .nullable()
            .when('recurrenceType', {
                is: (val: eRecurrenceType | null) => val === eRecurrenceType.WEEKLY,
                then: (schema) =>
                    schema
                        .required('Recurrence days are required for weekly classes')
                        .min(1, 'At least one recurrence day must be selected'),
                otherwise: (schema) => schema.nullable(),
            }),
        updateSeries: Yup.boolean().optional().nullable(),
    })

    useEffect(() => {
        dispatch(fetchAllInstructors({ all: true }))
    }, [dispatch])

    return (
        <div className="flex flex-col gap-5">
            <Formik
                initialValues={{
                    id: currentClass?.data?.id || '',
                    title: currentClass?.data?.title || '',
                    description: currentClass?.data?.description || '',
                    size: currentClass?.data?.size || 15,
                    date:
                        (currentClass?.data?.date && dayjs(currentClass.data?.date).format('YYYY-MM-DD HH:mm')) ||
                        dayjs().format('YYYY-MM-DD HH:mm'),
                    instructorId: currentClass?.data?.instructor?.id || null,
                    recurrenceType: currentClass?.data?.recurrenceType || null,
                    recurrenceDays: currentClass?.data?.recurrenceDays?.map((d) => d.toString()) || null,
                    updateSeries: false,
                }}
                validationSchema={ClassSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const { id, ...payload } = values
                    const utcDate = dayjs(values.date).utc().format()
                    const updatedPayload = {
                        id,
                        ...payload,
                        date: utcDate,
                        recurrenceDays: values?.recurrenceDays?.map((d: string) => parseInt(d, 10)),
                    }
                    if (values.id) {
                        dispatch(partialUpdateClass(updatedPayload))
                    } else {
                        dispatch(createClass(payload))
                    }

                    setSubmitting(false)
                    setIsOpen(false)
                    resetForm()
                }}
                enableReinitialize
            >
                {({ isSubmitting, handleSubmit, values, isValid }) => (
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
                        isValid={isValid}
                        isSubmitting={isSubmitting}
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
                                <label className="block text-sm font-medium text-gray-700">Recurrence Type</label>
                                <Field
                                    as="select"
                                    name="recurrenceType"
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                >
                                    <option value={''}>No recurrence</option>
                                    {Object.entries(eRecurrenceType).map(([key, value]) => (
                                        <option key={key} value={value || ''}>
                                            {key.charAt(0) + key.slice(1).toLowerCase()}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="recurrenceType" component="div" className="text-sm text-red-500" />
                            </div>

                            {values.recurrenceType === eRecurrenceType.WEEKLY && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Days of the Week</label>
                                    <div className="mt-1 flex gap-2">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                                            <label key={day} className="inline-flex items-center gap-1">
                                                <Field type="checkbox" name="recurrenceDays" value={idx.toString()} />
                                                <span>{day}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <ErrorMessage
                                        name="recurrenceDays"
                                        component="div"
                                        className="text-sm text-red-500"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Instructor</label>
                                <Field
                                    as="select"
                                    name="instructorId"
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                >
                                    <option value="">Select instructor</option>
                                    {instructors?.data?.results?.map((instructor) => (
                                        <option key={instructor.id} value={instructor.id}>
                                            {instructor.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="instructorId" component="div" className="text-sm text-red-500" />
                            </div>

                            {values.id && (
                                <div className="flex items-center gap-2">
                                    <Field
                                        type="checkbox"
                                        name="updateSeries"
                                        id="updateSeries"
                                        className={'h-4 w-4'}
                                    />
                                    <label htmlFor="updateSeries" className="text-sm font-medium text-gray-700">
                                        Apply changes to this and following classes
                                    </label>
                                </div>
                            )}
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
