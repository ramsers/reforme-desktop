import Modal from '@components/modal/Modal'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

type StripeModalProps = {
    isOpen: boolean
    onClose: () => void
    clientSecret: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

const StripeModal: React.FC<StripeModalProps> = ({ isOpen, onClose, clientSecret }) => {
    return (
        <Modal
            isOpen={isOpen}
            title="Complete your booking"
            content={
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm onClose={onClose} />
                </Elements>
            }
        />
    )
}

export default StripeModal
