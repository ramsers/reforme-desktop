import {RootState} from '@store/index'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {PlusIcon} from "@heroicons/react/24/solid";
import CreateEditInstructorForm from "@features/dashboard/instructors/CreateEditInstructorForm";

type CreateInstructorButtonModalOwnProps = {}

type CreateInstructorButtonModalSliceProps = {}

type CreateInstructorButtonModalDispatchProps = {}

type CreateInstructorButtonModalProps = CreateInstructorButtonModalOwnProps &
    CreateInstructorButtonModalSliceProps &
    CreateInstructorButtonModalDispatchProps

const CreateInstructorButtonModal: React.FC<CreateInstructorButtonModalProps> = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="group hover:bg-white transition-colors bg-dashboard-action cursor-pointer
                font-semibold text-main rounded-lg px-3 py-2 flex flex-row items-center gap-1"
            >
                <PlusIcon className="h-5 w-5 group-hover:text-dashboard-action"/>

                <span className="group-hover:text-dashboard-action">Create instructor</span>
            </button>


            <CreateEditInstructorForm title={"Create instructor"} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

    )
}

const mapStateToProps = (store: RootState): CreateInstructorButtonModalSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): CreateInstructorButtonModalDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(CreateInstructorButtonModal)
