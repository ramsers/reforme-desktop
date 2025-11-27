'use client'

import { RootState } from '@store/index'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
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
import RecurrenceSection from './RecurrenceSection'
import InstructorSelect from './InstructorSelect'
import UpdateSeriesSection from './UpdateSeriesSection'
import { formatLocalInputValue, toUTCISOString } from '../../../utils/dateUtils'

dayjs.extend(utc)

type CreateEditClassFormOwnProps = {
    isOpen: boolean
    setIsOpen: (opened: boolean) => void
    title: string
}

type CreateEditClassFormProps = CreateEditClassFormOwnProps

export type ClassFormValues = {
    id: string
    title: string
    description: string
    size: number
    date: string
    instructorId: string | null
    recurrenceType: eRecurrenceType | null
    recurrenceDays: string[] | null
    updateSeries: boolean | null
}

const CreateEditClassForm: React.FC<CreateEditClassFormProps> = ({ isOpen, setIsOpen, title }) => {
    const dispatch = useDispatch()
    const instructors: AsyncResource<ShortPaginatedResponse<User>> = useSelector(
        (state: RootState) => state.user?.instructors
    )
    const currentClass: AsyncResource<Class | null> = useSelector((state: RootState) => state.class?.class)
    const [recurrenceInteraction, setRecurrenceInteraction] = useState(false)
    const [requiresSeriesUpdate, setRequiresSeriesUpdate] = useState(false)

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
            <Formik<ClassFormValues>
                initialValues={{
                    id: currentClass?.data?.id || '',
                    title: currentClass?.data?.title || '',
                    description: currentClass?.data?.description || '',
                    size: currentClass?.data?.size || 15,
                    date:
                        (currentClass?.data?.date && formatLocalInputValue(currentClass.data?.date)) ||
                        formatLocalInputValue(new Date()),
                    instructorId: currentClass?.data?.instructor?.id || null,
                    recurrenceType: currentClass?.data?.recurrenceType || null,
                    recurrenceDays: currentClass?.data?.recurrenceDays?.map((d) => d.toString()) || null,
                    updateSeries: false,
                }}
                validationSchema={ClassSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const { id, ...payload } = values
                    const utcDate = toUTCISOString(values.date)
                    const updatedPayload = {
                        id,
                        ...payload,
                        date: utcDate,
                        recurrenceDays:
                            values?.recurrenceDays && values.recurrenceDays.length > 0
                                ? values.recurrenceDays.map((d: string) => parseInt(d, 10))
                                : null,
                    }
                    if (values.id) {
                        dispatch(partialUpdateClass(updatedPayload))
                    } else {
                        dispatch(createClass(updatedPayload))
                    }

                    setSubmitting(false)
                    setIsOpen(false)
                    resetForm()
                }}
                enableReinitialize
            >
                {({ isSubmitting, handleSubmit, values, isValid, setFieldValue }) => {
                    const isRecurringClass = Boolean(
                        currentClass?.data?.recurrenceType || currentClass?.data?.parentClassId
                    )

                    const originalRecurrenceType = currentClass?.data?.recurrenceType || null
                    const originalRecurrenceDays = currentClass?.data?.recurrenceDays?.map(String) || null
                    const canEditRecurrence = !values.id || isRecurringClass

                    return (
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
                            isValid={isValid && !requiresSeriesUpdate}
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

                                <RecurrenceSection
                                    canEditRecurrence={canEditRecurrence}
                                    isRecurringClass={isRecurringClass}
                                    originalRecurrenceDays={originalRecurrenceDays}
                                    originalRecurrenceType={originalRecurrenceType}
                                    recurrenceInteraction={recurrenceInteraction}
                                    setFieldValue={setFieldValue as FormikHelpers<ClassFormValues>['setFieldValue']}
                                    setRecurrenceInteraction={setRecurrenceInteraction}
                                    values={values}
                                    onRequiresSeriesUpdateChange={setRequiresSeriesUpdate}
                                />

                                <InstructorSelect instructors={instructors} />

                                <UpdateSeriesSection
                                    showUpdateSeries={Boolean(values.id && values.recurrenceType)}
                                    requiresSeriesUpdate={requiresSeriesUpdate}
                                    recurrenceType={values.recurrenceType}
                                />
                            </Form>
                        </SlidingModal>
                    )
                }}
            </Formik>
        </div>
    )
}

export default CreateEditClassForm
