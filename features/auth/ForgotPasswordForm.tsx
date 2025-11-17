// components/forms/ForgotPasswordForm.tsx

import React from 'react'
import { Field, ErrorMessage } from 'formik'

const ForgotPasswordForm: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium">
                    Email
                </label>

                <Field
                    name="email"
                    type="email"
                    placeholder="Enter your account email"
                    className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:outline-none"
                />

                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
            </div>
        </div>
    )
}

export default ForgotPasswordForm
