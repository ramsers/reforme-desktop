import SlidingModal from '@components/slidingModal/SlidingModal'
import { eRole } from '@reformetypes/authTypes'
import { User } from '@reformetypes/userTypes'
import { createUser, updateUser } from '@store/slices/userSlice'
import AppRoutes from 'config/appRoutes'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

type CreateEditClassFormProps = {
    title: string
    isOpen: boolean
    setIsOpen: (opened: boolean) => void
    client?: User | null
}

const CreateEditClassForm: React.FC<CreateEditClassFormProps> = ({ title, isOpen, setIsOpen, client }) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const CreateUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
            .notRequired(),
    })

    console.log('CLIENT IN MODAL =============', client)
    return (
        <Formik
            initialValues={{
                id: client?.id || '',
                name: client?.name || '',
                email: client?.email || '',
                phoneNumber: client?.phoneNumber || '',
                role: client?.role || eRole.CLIENT,
            }}
            validationSchema={CreateUserSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log('VALUES =============', values)
                const { id, ...payload } = values

                if (!id) {
                    dispatch(createUser(payload))
                } else {
                    dispatch(updateUser(values))
                }

                setIsOpen(false)
                resetForm()
                setSubmitting(false)
            }}
            enableReinitialize
        >
            {({ isSubmitting, handleSubmit, values, isValid, resetForm }) => (
                <SlidingModal
                    title={title}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    content={'Save'}
                    onClick={handleSubmit}
                    onClose={() => {
                        setIsOpen(false)
                        resetForm()
                    }}
                    isValid={isValid}
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
                                name="email"
                                type="text"
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
                    {values.id && (
                        <button
                            className="hover:text-foreground cursor-pointer text-left text-blue-600"
                            onClick={() => client?.id && router.push(AppRoutes.dashboard.clients.client(client.id))}
                        >
                            View full client info
                        </button>
                    )}
                </SlidingModal>
            )}
        </Formik>
    )
}

export default CreateEditClassForm
