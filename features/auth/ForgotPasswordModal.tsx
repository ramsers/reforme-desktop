import Modal from '@components/modal/Modal'
import React from 'react'
import ForgotPasswordForm from './ForgotPasswordForm'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

type ForgetPasswordModalProps = {
    isOpen: boolean
    onClose: () => void
}

const ForgetPasswordModal: React.FC<ForgetPasswordModalProps> = ({ isOpen, onClose }) => {
    return (
        <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Email is required'),
            })}
            onSubmit={(values) => {
                console.log('FORM SUBMITTED WITH VALUES:', values)
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
