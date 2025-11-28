import React from 'react'
import { Field } from 'formik'
import { eRecurrenceType } from '@reformetypes/classTypes'

type UpdateSeriesSectionProps = {
    showUpdateSeries: boolean
    requiresSeriesUpdate: boolean
    recurrenceType: eRecurrenceType | null
}

const UpdateSeriesSection: React.FC<UpdateSeriesSectionProps> = ({
    showUpdateSeries,
    requiresSeriesUpdate,
    recurrenceType,
}) => {
    return (
        <>
            {showUpdateSeries ? (
                <div className="flex items-center gap-2">
                    <Field type="checkbox" name="updateSeries" id="updateSeries" className={'h-4 w-4'} />
                    <label htmlFor="updateSeries" className="text-sm font-medium text-gray-700">
                        Apply changes to this and following classes
                    </label>
                </div>
            ) : null}
            {requiresSeriesUpdate && recurrenceType ? (
                <div className="text-sm text-red-500">Update series is required after changing recurrence</div>
            ) : null}
        </>
    )
}

export default UpdateSeriesSection
