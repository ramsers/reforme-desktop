import SlidingModal from '@components/slidingModal/SlidingModal'
import UserSelect from '@features/user/UserSelect'
import { RootState } from '@store/index'
import { createBooking } from '@store/slices/bookingSlice'
import { fetchAllClients } from '@store/slices/userSlice'
import { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type AddClientModalProps = {
    isOpen: boolean
    setIsOpen: (opened: boolean) => void
    onClose: () => void
    classId: string | null
}

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose, setIsOpen, classId }) => {
    const dispatch = useDispatch()
    const clients = useSelector((state: RootState) => state.user.clients)
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null)

    useEffect(() => {
        if (!clients.data.results.length) {
            console.log('IS infinite loop===================')
            dispatch(fetchAllClients({ page: 1 }))
        }
    }, [])

    const handleSetSelectedClient = (id: string) => {
        setSelectedClientId(id)
    }

    const handleCreateBooking = () => {
        console.log('handleCreateBooking===================', selectedClientId, classId)
        if (!selectedClientId || !classId) return null
        dispatch(createBooking({ clientId: selectedClientId, classId: classId }))
        setIsOpen(false)
    }

    return (
        <SlidingModal
            title={'Manage Bookings'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            content={'Save'}
            onClick={handleCreateBooking}
            onClose={() => {
                setIsOpen(false)
            }}
        >
            <>
                <p>Yolo</p>
                <UserSelect
                    users={clients.data.results}
                    selectedUserId={selectedClientId}
                    onChange={handleSetSelectedClient}
                />
            </>
        </SlidingModal>
    )
}

export default AddClientModal
