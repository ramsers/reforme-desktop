import React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {ErrorMessage, Field, Form, Formik} from "formik";
import Image from "next/image";

type AuthLayoutOwnProps = {
    form: React.ReactNode
    imgPath: string
    title: string
}

type AuthLayoutSliceProps = {}

type AuthLayoutDispatchProps = {}

type AuthLayoutProps = AuthLayoutOwnProps &
    AuthLayoutSliceProps &
    AuthLayoutDispatchProps

const AuthLayout: React.FC<AuthLayoutProps> = ({form, imgPath, title}) => {
    return (
        <div className="h-screen flex h-full flex-col-reverse justify-between overflow-y-auto lg:flex-row lg:overflow-y-clip">
            <div className="flex flex-col h-full w-full items-center justify-center p-4 lg:w-2/5 lg:p-16 gap-5">
                <h2 className="text-4xl font-bold mb-4 !text-left justify-start">{title}</h2>
                {form}
            </div>

            <aside className="hidden lg:flex lg:flex-1 items-center justify-center overflow-hidden ">
                <Image
                    src={imgPath}
                    width={1500}
                    height={500}
                    alt="Picture of the author"
                    className="object-cover w-full h-full"
                />
            </aside>
        </div>
    )
}

export default AuthLayout
