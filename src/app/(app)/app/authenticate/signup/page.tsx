'use client'

import {RootState} from '@store/index'
import React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SignUpForm from "@features/auth/SignUpForm";

type SignUpPageOwnProps = {}

type SignUpPageSliceProps = {}

type SignUpPageDispatchProps = {}

type SignUpPageProps = SignUpPageOwnProps &
    SignUpPageSliceProps &
    SignUpPageDispatchProps

const SignUpPage: React.FC<SignUpPageProps> = () => {

    return (
        <div>
            <SignUpForm />
        </div>
    )
}

const mapStateToProps = (store: RootState): SignUpPageSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): SignUpPageDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
