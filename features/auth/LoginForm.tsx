import {RootState} from '@store/index'
import React from 'react'
import {connect, useDispatch} from 'react-redux'
import {Dispatch} from 'redux'
import {AppDispatch} from "@store/index";
import * as Yup from "yup";
import {Formik, Form, Field, ErrorMessage} from "formik";
import Image from 'next/image'
import {eRole} from "@reformetypes/authTypes";
import {signUp, login} from "@store/slices/signUpSlice";
import {useRouter} from "next/navigation";
import AppRoutes from "../../config/appRoutes";


type LoginFormOwnProps = {}

type LoginFormSliceProps = {}

type LoginFormDispatchProps = {}

type LoginFormProps = LoginFormOwnProps &
    LoginFormSliceProps &
    LoginFormDispatchProps

const LoginForm: React.FC<LoginFormProps> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    return (
        <div className="flex flex-col gap-5">
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const payload = {
                        ...values,
                        onSuccess: (user) => {
                            if (user.role === eRole.ADMIN) {
                                router.push(AppRoutes.dashboard.main)
                            } else {
                                router.push(AppRoutes.home)
                            }
                        }
                    }
                    dispatch(login(payload))


                    setSubmitting(false);
                }}>
                {({ isSubmitting }) => (
                    <>
                        <Form className="flex flex-col gap-4 w-full">
                            <div>
                                <label className="font-semibold">Email</label>
                                <Field name="email" type="email" className="border border-2 border-brown-default p-2 w-full rounded-lg" />
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
                                    className="border border-2 p-2 w-full rounded-lg border-brown-default"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <button type="submit" className="bg-brown-default p-4 rounded-lg text-main font-semibold hover:bg-brown-50 transition-colors">
                                Login
                            </button>
                        </Form>
                    </>
                )}
            </Formik>
            <div className="flex flex-row gap-1">
                <p> Dont have an account?</p>
                <button onClick={() => router.push(AppRoutes.authenticate.signUp)}
                        className="underline text-blue-600 cursor-pointer">Sign Up
                </button>
            </div>
        </div>
    )
}

export default LoginForm
