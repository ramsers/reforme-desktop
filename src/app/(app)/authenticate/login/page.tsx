'use client'

import {RootState} from '@store/index'
import React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SignUpForm from "@features/auth/SignUpForm";
import LoginForm from "@features/auth/LoginForm";

type LoginPageOwnProps = {}

type LoginPageSliceProps = {}

type LoginPageDispatchProps = {}

type LoginPageProps = LoginPageOwnProps &
    LoginPageSliceProps &
    LoginPageDispatchProps

const LoginPage: React.FC<LoginPageProps> = () => {

    return (
        <div>
            <LoginForm />
        </div>
    )
}

const mapStateToProps = (store: RootState): LoginPageSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): LoginPageDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
