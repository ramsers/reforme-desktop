"use client"

import {RootState} from '@store/index'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {PlusIcon} from "@heroicons/react/24/solid";
import CreateClassForm from "@features/dashboard/classes/CreateEditClassForm";

type CreateClassButtonModalOwnProps = {}

type CreateClassButtonModalSliceProps = {}

type CreateClassButtonModalDispatchProps = {}

type CreateClassButtonModalProps = CreateClassButtonModalOwnProps &
    CreateClassButtonModalSliceProps &
    CreateClassButtonModalDispatchProps

const CreateClassButtonModal: React.FC<CreateClassButtonModalProps> = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="group hover:bg-white transition-colors bg-dashboard-action cursor-pointer
                font-semibold text-main rounded-lg px-3 py-2 flex flex-row items-center gap-1"
            >
                <PlusIcon className="h-5 w-5 group-hover:text-dashboard-action"/>

                <span className="group-hover:text-dashboard-action">Create class</span>
            </button>
            <CreateClassForm title={"Create class"} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

    )
}

const mapStateToProps = (store: RootState): CreateClassButtonModalSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): CreateClassButtonModalDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(CreateClassButtonModal)
