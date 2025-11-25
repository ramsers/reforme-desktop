import Modal from '@components/modal/Modal'
import React from 'react'
import ForgotPasswordForm from './ForgotPasswordForm'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '@store/slices/authSlice'

type ForgetPasswordModalProps = {
    isOpen: boolean
    onClose: () => void
}

const ForgetPasswordModal: React.FC<ForgetPasswordModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    return (
        <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Email is required'),
            })}
            onSubmit={(values) => {
                dispatch(forgotPassword({ email: values.email }))
            }}
        >
            {({ isValid, dirty, handleSubmit }) => (
                <Modal
                    isOpen={isOpen}
                    title="Enter account email"
                    onClose={onClose}
                    onConfirm={() => handleSubmit()}
                    confirmDisabled={!isValid || !dirty}
                    content={
                        <Form>
                            <ForgotPasswordForm />
                        </Form>
                    }
                />
            )}
        </Formik>
    )
}

export default ForgetPasswordModal
