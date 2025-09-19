import {RootState} from '@store/store'
import React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {eRole} from "@reformetypes/authTypes";
import AppRoutes from "../../../config/appRoutes";
import {signUp} from "@store/slices/signUpSlice";
import {Formik} from "formik";
import * as Yup from "yup";

type CreateClassFormOwnProps = {}

type CreateClassFormSliceProps = {}

type CreateClassFormDispatchProps = {}

type CreateClassFormProps = CreateClassFormOwnProps &
    CreateClassFormSliceProps &
    CreateClassFormDispatchProps

const CreateClassForm: React.FC<CreateClassFormProps> = () => {
    const SignupSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
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
                    password: "",
                    phoneNumber: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {
                    // const payload = {
                    //     ...values,
                    //     phoneNumber: values.phoneNumber || '',
                    //     role: eRole.CLIENT,
                    //     onSuccess: () => router.push(AppRoutes.home)
                    // }
                    // dispatch(signUp(payload))
                    //
                    //
                    // setSubmitting(false);
                }}
            >

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
