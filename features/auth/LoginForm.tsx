import {RootState} from '@store/index'
import React from 'react'
import {connect, useDispatch} from 'react-redux'
import {Dispatch} from 'redux'
import {AppDispatch} from "@store/index";
import * as Yup from "yup";
import {Formik, Form, Field, ErrorMessage} from "formik";
import Image from 'next/image'


type LoginFormOwnProps = {}

type LoginFormSliceProps = {}

type LoginFormDispatchProps = {}

type LoginFormProps = LoginFormOwnProps &
    LoginFormSliceProps &
    LoginFormDispatchProps

const LoginForm: React.FC<LoginFormProps> = () => {
    const dispatch = useDispatch<AppDispatch>();

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    return (
        <div className="h-screen flex h-full flex-col-reverse justify-between overflow-y-auto lg:flex-row lg:overflow-y-clip">

            {/* Form Section */}
            <div className="flex h-full w-full items-center justify-center p-4 lg:w-2/5 lg:p-16">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, { setSubmitting }) => {}}>
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-4 w-full">
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
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Image Section */}
            <aside className="hidden lg:flex lg:flex-1 items-center justify-center overflow-hidden bg-[url('/images/main_hero.jpg')] bg-cover bg-center bg-no-repeat">
                <Image
                    src="/images/burn_plus.jpg"
                    width={1500}
                    height={500}
                    alt="Picture of the author"
                    className="object-cover w-full h-full"
                />
            </aside>
        </div>
    )
}

const mapStateToProps = (store: RootState): LoginFormSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): LoginFormDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
