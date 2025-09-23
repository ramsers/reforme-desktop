import {RootState} from '@store/index'
import React from 'react'
import {connect, useDispatch} from 'react-redux'
import {Dispatch} from 'redux'
import * as Yup from "yup";
import {User} from "@reformetypes/userTypes";
import {ErrorMessage, Field, Form, Formik} from "formik";
import dayjs from "dayjs";
import {clearClass, createClass, partialUpdateClass} from "@store/slices/classSlice";
import SlidingModal from "@components/slidingModal/SlidingModal";

type CreateEditInstructorFormOwnProps = {
    isOpen: boolean
    setIsOpen: (opened: boolean) => void
    title: string
}

type CreateEditInstructorFormSliceProps = {}

type CreateEditInstructorFormDispatchProps = {}

type CreateEditInstructorFormProps = CreateEditInstructorFormOwnProps &
    CreateEditInstructorFormSliceProps &
    CreateEditInstructorFormDispatchProps

const CreateEditInstructorForm: React.FC<CreateEditInstructorFormProps> = ({isOpen, setIsOpen, title}) => {
    const dispatch = useDispatch()

    const InstructorSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number")
            .notRequired(),
    });
    return (
            <div className="flex flex-col gap-5">
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        phoneNumber: "",
                    }}
                    validationSchema={InstructorSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        const payload = {
                            ...values,
                        }

                        console.log('PAYLOAD ===========', payload)

                        // dispatch(createClass(payload))
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
                        // // setIsOpen(false);
                        // resetForm()
                    }}
                    enableReinitialize
                >
                    {({ isSubmitting, handleSubmit }) => (
                        <SlidingModal
                            title={title}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            content={"Save"}
                            onClick={handleSubmit}
                            // onClose={() => {
                            //     setIsOpen(false)
                            //     dispatch(clearClass())
                            // }}
                        >
                            <Form className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-brown-default"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <Field
                                        as="textarea"
                                        name="email"
                                        rows={3}
                                        className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-brown-default"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone number
                                    </label>
                                    <Field
                                        name="phoneNumber"
                                        type="text"
                                        className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-brown-default"
                                    />
                                    <ErrorMessage
                                        name="phoneNumber"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                            </Form>
                        </SlidingModal>
                    )}
                </Formik>
            </div>
        )
}

const mapStateToProps = (store: RootState): CreateEditInstructorFormSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): CreateEditInstructorFormDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditInstructorForm)
