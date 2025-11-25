import React, { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { syncUserAfterPayment } from '@store/slices/paymentSlice'

type CheckoutFormProps = {
    onClose: () => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose }) => {
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handlePaymentSuccess = async () => {
        onClose()
        dispatch(syncUserAfterPayment())
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) return

        setLoading(true)

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {},
            redirect: 'if_required',
        })

        if (result.error) {
            setErrorMessage(result.error.message || 'Payment failed')
        } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
            toast.success('Payment successful!')
            handlePaymentSuccess()
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <PaymentElement />
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
            <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={onClose} className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300">
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    {loading ? 'Processing…' : 'Pay Now'}
                </button>
            </div>
        </form>
    )
}

export default CheckoutForm
