"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import {AppDispatch, RootState} from '@store/index'
import React from 'react'
import {connect, useDispatch} from 'react-redux'
import {Dispatch} from 'redux'
import * as Yup from "yup";
import {eRole, SignUpPayload} from "@reformetypes/authTypes";
import { signUp } from "@store/slices/signUpSlice"

type SignUpFormOwnProps = {}

type SignUpFormProps = SignUpFormOwnProps

const SignUpForm: React.FC<SignUpFormProps> = () => {
    const dispatch = useDispatch<AppDispatch>();

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number")
            .notRequired(),
    });

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>

            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    phoneNumber: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {
                    // 🚨 Don't log password in devtools!
                    console.log("Submitting (without password):", values);
                    const payload = {
                        ...values,
                        role: eRole.CLIENT,
                        // onSuccess: () => console.log('Hello =========='),
                        // onError: () => console.log('error ==========')
                    }
                    dispatch(signUp(payload))


                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-4">
                        <div>
                            <label>Name</label>
                            <Field name="name" className="border p-2 w-full" />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div>
                            <label>Email</label>
                            <Field name="email" type="email" className="border p-2 w-full" />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div>
                            <label>Password</label>
                            <Field
                                name="password"
                                type="password"
                                className="border p-2 w-full"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div>
                            <label>Phone Number (optional)</label>
                            <Field name="phoneNumber" className="border p-2 w-full" />
                            <ErrorMessage
                                name="phoneNumber"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            // disabled={isSubmitting}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignUpForm
