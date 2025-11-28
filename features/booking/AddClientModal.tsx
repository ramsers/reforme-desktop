import SlidingModal from '@components/slidingModal/SlidingModal'
import UserSelect from '@features/user/UserSelect'
import { AsyncResource } from '@reformetypes/common/ApiTypes'
import { ShortPaginatedResponse } from '@reformetypes/common/PaginatedResponseTypes'
import { User } from '@reformetypes/userTypes'
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
    const clients: AsyncResource<ShortPaginatedResponse<User>> = useSelector((state: RootState) => state.user.clients)
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null)

    useEffect(() => {
        dispatch(fetchAllClients({ all: true }))
    }, [])

    const handleSetSelectedClient = (id: string) => {
        setSelectedClientId(id)
    }

    const handleCreateBooking = () => {
        if (!selectedClientId || !classId) return null
        dispatch(createBooking({ clientId: selectedClientId, classId: classId }))
        setIsOpen(false)
        setSelectedClientId(null)
    }

    return (
        <SlidingModal
            title={'Add clients'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            content={'Save'}
            onClick={handleCreateBooking}
            onClose={() => {
                setIsOpen(false)
                setSelectedClientId(null)
            }}
            isValid={!!selectedClientId}
        >
            <>
                <p>Search or select a client from the list below</p>
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
