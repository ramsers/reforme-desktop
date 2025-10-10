import React, { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

type CheckoutFormProps = {
    onClose: () => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) return

        setLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href, // optional
            },
        })

        if (error) {
            setErrorMessage(error.message || 'Payment failed')
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
