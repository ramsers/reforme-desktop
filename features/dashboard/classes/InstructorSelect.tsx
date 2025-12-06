import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { User } from '@reformetypes/userTypes'
import { AsyncResource } from '@reformetypes/common/ApiTypes'

type InstructorSelectProps = {
    instructors: AsyncResource<ShortPaginatedResponse<User>>
}

const InstructorSelect: React.FC<InstructorSelectProps> = ({ instructors }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Instructor</label>
            <Field
                as="select"
                name="instructorId"
                className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
            >
                <option value="">Select instructor</option>
                {instructors?.data?.results?.map((instructor) => (
                    <option key={instructor.id} value={instructor.id.toString()}>
                        {instructor.name}
                    </option>
                ))}
            </Field>
        </div>
    )
}

export default InstructorSelect
