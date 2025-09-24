import { RootState } from '@store/index'
import React, { useContext } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import * as Yup from 'yup'
import { User } from '@reformetypes/userTypes'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import dayjs from 'dayjs'
import { createUser, updateUser, UserSliceType } from '@store/slices/userSlice'
import SlidingModal from '@components/slidingModal/SlidingModal'
import { eRole } from '@reformetypes/authTypes'
import { InstructorTableContext } from './instructors/InstructorTableContextProvider'

type CreateEditInstructorFormOwnProps = {
    isOpen: boolean
    setIsOpen: () => void
    title: string
}

type CreateEditInstructorFormSliceProps = {}

type CreateEditInstructorFormDispatchProps = {}

type CreateEditInstructorFormProps = CreateEditInstructorFormOwnProps &
    CreateEditInstructorFormSliceProps &
    CreateEditInstructorFormDispatchProps

const CreateEditInstructorForm: React.FC<CreateEditInstructorFormProps> = ({ isOpen, setIsOpen, title }) => {
    const dispatch = useDispatch()
    const context = useContext(InstructorTableContext)

    const instructor: User | null = useSelector(
        (state: RootState) => state?.user.instructors.find((inst) => inst.id === context?.instructorId) || null
    )

    if (!context) return null

    const InstructorSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
            .notRequired(),
    })
    return (
        <div className="flex flex-col gap-5">
            <Formik
                initialValues={{
                    id: instructor?.id || '',
                    name: instructor?.name || '',
                    email: instructor?.email || '',
                    phoneNumber: instructor?.phoneNumber || '',
                }}
                validationSchema={InstructorSchema}
                onSubmit={(values, { resetForm }) => {
                    const { id, ...payload } = values

                    // const payload = {
                    //     ...values,
                    //     role: eRole.INSTRUCTOR,
                    // }

                    console.log('PAYLOAD ===========')

                    if (!values.id) {
                        dispatch(createUser(payload))
                    } else {
                        console.log('Hitting update user=================')
                        dispatch(updateUser(values))
                    }

                    // const { id,
                    //     ...payload
                    // } = values
                    //
                    // if (values.id) {
                    //     console.log('hitting partial update=================', values)
                    //
                    //     dispatch(partialUpdateClass(values))
                    // } else {
                    //     dispatch(createClass(payload))
                    // }
                    //
                    //
                    // setSubmitting(false);
                    setIsOpen()
                    resetForm()
                }}
                enableReinitialize
            >
                {({ isSubmitting, handleSubmit }) => (
                    <SlidingModal
                        title={title}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        content={'Save'}
                        onClick={handleSubmit}
                        // onClose={() => {
                        //     setIsOpen(false)
                        //     dispatch(clearClass())
                        // }}
                    >
                        <Form className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <Field
                                    name="name"
                                    type="text"
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                />
                                <ErrorMessage name="name" component="div" className="text-sm text-red-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                />
                                <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone number</label>
                                <Field
                                    name="phoneNumber"
                                    type="text"
                                    className="focus:ring-brown-default mt-1 w-full rounded-lg border px-3 py-2 focus:ring"
                                />
                                <ErrorMessage name="phoneNumber" component="div" className="text-sm text-red-500" />
                            </div>
                        </Form>
                    </SlidingModal>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = (store: RootState): CreateEditInstructorFormSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): CreateEditInstructorFormDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditInstructorForm)
