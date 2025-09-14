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
        <div className="max-w-md mx-auto p-4">
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    phoneNumber: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const payload = {
                        ...values,
                        phoneNumber: values.phoneNumber || '',
                        role: eRole.CLIENT,
                    }
                    dispatch(signUp(payload))


                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-4">
                        <div>
                            <label className="font-semibold">Name</label>
                            <Field name="name" className="border border-2 border-brown-default p-2 w-full rounded-lg" />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">Email</label>
                            <Field name="email" type="email" className="border p-2 w-full border-2 border-brown-default rounded-lg" />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">Password</label>
                            <Field
                                name="password"
                                type="password"
                                className="border p-2 w-full border-2 border-brown-default rounded-lg"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">Phone Number (optional)</label>
                            <Field name="phoneNumber" className="border p-2 w-full border-2 border-brown-default rounded-lg" />
                            <ErrorMessage
                                name="phoneNumber"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <button type="button" className="bg-brown-default p-4 rounded-lg text-main font-semibold hover:bg-brown-50 transition-colors">
                        {/*    type="submit"*/}
                        {/*    // disabled={isSubmitting}*/}
                        {/*    className="bg-blue-600 text-white px-4 py-2 rounded"*/}
                        {/*>*/}
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignUpForm
