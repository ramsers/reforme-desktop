'use client'

import { RootState } from '@store/index'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { PlusIcon } from '@heroicons/react/24/solid'
import CreateClassForm from '@features/dashboard/classes/CreateEditClassForm'
import Button from '@components/button/button'

type CreateClassButtonModalOwnProps = {}

type CreateClassButtonModalSliceProps = {}

type CreateClassButtonModalDispatchProps = {}

type CreateClassButtonModalProps = CreateClassButtonModalOwnProps &
    CreateClassButtonModalSliceProps &
    CreateClassButtonModalDispatchProps

const CreateClassButtonModal: React.FC<CreateClassButtonModalProps> = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <Button text={'Create class'} onClick={() => setIsOpen(true)} icon={<PlusIcon />} variant="dashboard" />
            <CreateClassForm title={'Create class'} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

const mapStateToProps = (store: RootState): CreateClassButtonModalSliceProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): CreateClassButtonModalDispatchProps => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CreateClassButtonModal)
