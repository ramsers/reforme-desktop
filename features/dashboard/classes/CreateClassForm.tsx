import {RootState} from '@store/index'
import React from 'react'
import {connect, useDispatch} from 'react-redux'
import {Dispatch} from 'redux'
import {eRole} from "@reformetypes/authTypes";
import AppRoutes from "../../../config/appRoutes";
import {signUp} from "@store/slices/signUpSlice";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import SlidingModal from "@components/slidingModal/SlidingModal";
import {createClass} from "@store/slices/classSlice"


type CreateClassFormOwnProps = {
    isOpen: boolean
    setIsOpen: (opened: boolean) => void
}

type CreateClassFormSliceProps = {}

type CreateClassFormDispatchProps = {}

type CreateClassFormProps = CreateClassFormOwnProps &
    CreateClassFormSliceProps &
    CreateClassFormDispatchProps

const CreateClassForm: React.FC<CreateClassFormProps> = ({isOpen, setIsOpen}) => {
    const dispatch = useDispatch()

    const SignupSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        size: Yup.number().required("Class size is required"),
        date: Yup.date().required("Class date is required"),
        instructorId: Yup.string().optional().nullable(),
        // phoneNumber: Yup.string()
        //     .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number")
        //     .notRequired(),

        // title: str
        // description: str
        // size: int
        // date: datetime
        // instructor_id: str
    });

    return (
        <div className="flex flex-col gap-5">
            <Formik
                initialValues={{
                    title: "",
                    description: "",
                    size: 15,
                    date: dayjs().format("YYYY-MM-DD HH:mm"),
                    instructorId: null,
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('TRIGGERIMG ON SUBMIT =================', values)
                    // const payload = {
                    //     ...values,
                    //     phoneNumber: values.phoneNumber || '',
                    //     role: eRole.CLIENT,
                    //     onSuccess: () => router.push(AppRoutes.home)
                    // }
                    dispatch(createClass(values))
                    //
                    //
                    // setSubmitting(false);
                }}
            >
                {({ isSubmitting, handleSubmit }) => (
                    <SlidingModal
                        title={"Create class"}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        content={"Save"}
                        onClick={() => handleSubmit()}
                    >

                    <Form className="flex flex-col gap-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <Field
                                name="title"
                                type="text"
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-brown-default"
                            />
                            <ErrorMessage
                                name="title"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <Field
                                as="textarea"
                                name="description"
                                rows={3}
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-brown-default"
                            />
                        </div>

                        {/* Size */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Size
                            </label>
                            <Field
                                name="size"
                                type="number"
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-brown-default"
                            />
                            <ErrorMessage
                                name="size"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <Field
                                name="date"
                                type="datetime-local"
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-brown-default"
                            />
                            <ErrorMessage
                                name="date"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        {/* Instructor */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Instructor
                            </label>
                            <Field
                                as="select"
                                name="instructorId"
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-brown-default"
                            >
                                <option value="">Select instructor</option>
                                <option value="1">Instructor A</option>
                                <option value="2">Instructor B</option>
                            </Field>
                            <ErrorMessage
                                name="instructorId"
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

const mapStateToProps = (store: RootState): CreateClassFormSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): CreateClassFormDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(CreateClassForm)
