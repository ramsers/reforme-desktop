import React, { useEffect } from 'react'
import { ErrorMessage, Field } from 'formik'
import { eRecurrenceType } from '@reformetypes/classTypes'
import { ClassFormValues } from './CreateEditClassForm'

type RecurrenceSectionProps = {
    canEditRecurrence: boolean
    isRecurringClass: boolean
    originalRecurrenceType: eRecurrenceType | null
    originalRecurrenceDays: string[] | null
    recurrenceInteraction: boolean
    setRecurrenceInteraction: (value: boolean) => void
    setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void
    values: ClassFormValues
    onRequiresSeriesUpdateChange?: (value: boolean) => void
}

const RecurrenceSection: React.FC<RecurrenceSectionProps> = ({
    canEditRecurrence,
    isRecurringClass,
    originalRecurrenceDays,
    originalRecurrenceType,
    recurrenceInteraction,
    setRecurrenceInteraction,
    setFieldValue,
    values,
    onRequiresSeriesUpdateChange,
}) => {
    const newRecurrenceType = values.recurrenceType || null
    const newRecurrenceDays = values.recurrenceDays || null
    const recurrenceDaysEqual = JSON.stringify(originalRecurrenceDays ?? []) === JSON.stringify(newRecurrenceDays ?? [])
    const recurrenceUnchanged = originalRecurrenceType === newRecurrenceType && recurrenceDaysEqual

    const handleRecurrenceInteraction = () => {
        if (!canEditRecurrence) {
            return
        }

        if (values.id && isRecurringClass) {
            setRecurrenceInteraction(true)
        }
    }

    const requiresSeriesUpdate = Boolean(
        values.id && isRecurringClass && recurrenceInteraction && !recurrenceUnchanged && !values.updateSeries
    )

    useEffect(() => {
        if (onRequiresSeriesUpdateChange) {
            onRequiresSeriesUpdateChange(requiresSeriesUpdate)
        }
    }, [onRequiresSeriesUpdateChange, requiresSeriesUpdate])

    if (!canEditRecurrence) {
        return null
    }

    return (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700">Recurrence Type</label>
                <Field
                    as="select"
                    name="recurrenceType"
                    value={values.recurrenceType || ''}
                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        handleRecurrenceInteraction()
                        const value = e.target.value || null
                        setFieldValue('recurrenceType', value)
                    }}
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
                                <Field
                                    type="checkbox"
                                    name="recurrenceDays"
                                    value={idx.toString()}
                                    checked={(values.recurrenceDays || [])?.includes(idx.toString())}
                                    onChange={(e) => {
                                        handleRecurrenceInteraction()
                                        const updatedDays = new Set(values.recurrenceDays || [])

                                        if (e.target.checked) {
                                            updatedDays.add(idx.toString())
                                        } else {
                                            updatedDays.delete(idx.toString())
                                        }

                                        setFieldValue('recurrenceDays', Array.from(updatedDays))
                                    }}
                                />
                                <span>{day}</span>
                            </label>
                        ))}
                    </div>
                    <ErrorMessage name="recurrenceDays" component="div" className="text-sm text-red-500" />
                </div>
            )}
        </>
    )
}

export default RecurrenceSection
