import React, { createContext, ReactNode, useCallback, useMemo, useState } from 'react'

type InstructorTableContextType = {
    instructorId: string
    isOpen: boolean
    handleOpenInstructorModal: () => void
    handleCloseInstructorModal: () => void
    handleSetInstructorId: (id: string) => void
}

type InstructorTableContextProviderProps = {
    children: ReactNode
}

export const InstructorTableContext = createContext<InstructorTableContextType | null>(null)

const InstructorTableContextProvider: React.FC<InstructorTableContextProviderProps> = ({ children }) => {
    const [instructorId, setInstructorId] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenInstructorModal = useCallback(() => {
        setIsOpen(true)
    }, [setIsOpen])

    const handleCloseInstructorModal = useCallback(() => {
        setIsOpen(false)
    }, [setIsOpen])

    const handleSetInstructorId = useCallback((id: string) => {
        setInstructorId(id)
    }, [])

    const contextValue = useMemo(
        () => ({
            instructorId,
            isOpen,
            handleOpenInstructorModal,
            handleCloseInstructorModal,
            handleSetInstructorId,
        }),
        [instructorId, isOpen, handleOpenInstructorModal, handleCloseInstructorModal, handleSetInstructorId]
    )

    return <InstructorTableContext.Provider value={contextValue}>{children}</InstructorTableContext.Provider>
}

export default InstructorTableContextProvider
