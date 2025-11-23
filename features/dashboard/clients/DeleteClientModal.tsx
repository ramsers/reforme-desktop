'use client'

import Modal from '@components/modal/Modal'
import { deleteUser } from '@store/slices/userSlice'
import AppRoutes from 'config/appRoutes'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

type DeleteClientModalProps = {
    isOpen: boolean
    onClose: () => void
    clientId: string
}

const DeleteClientModal: React.FC<DeleteClientModalProps> = ({ isOpen, onClose, clientId }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const handleDeleteUserRedirection = () => {
        router.push(AppRoutes.dashboard.clients.list)
    }

    const handleDelete = () => {
        dispatch(deleteUser({ data: clientId, onSuccess: handleDeleteUserRedirection }))
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete client"
            content={<p>Are you sure you want to delete this client?</p>}
            confirmText="Delete"
            onConfirm={() => handleDelete()}
        />
    )
}

export default DeleteClientModal
