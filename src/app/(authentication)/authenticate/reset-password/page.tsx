'use client'

import { RootState } from '@store/index'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AuthLayout from '@components/layout/AuthLayout'
import ResetPasswordForm from '@features/auth/ResetPasswordForm'

type ResetPasswordPageOwnProps = {}

type ResetPasswordPageSliceProps = {}

type ResetPasswordPageDispatchProps = {}

type ResetPasswordPageProps = ResetPasswordPageOwnProps & ResetPasswordPageSliceProps & ResetPasswordPageDispatchProps

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = () => {
    return (
        <div>
            <AuthLayout form={<ResetPasswordForm />} imgPath={'/images/reset_password.jpg'} title={'Reset Password'} />
        </div>
    )
}

const mapStateToProps = (store: RootState): ResetPasswordPageSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): ResetPasswordPageDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)
