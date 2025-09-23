import {RootState} from '@store/index'
import React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import dayjs from "dayjs";
import {PencilIcon} from "@heroicons/react/24/solid";
import CreateClassForm from "@features/dashboard/classes/CreateEditClassForm";
import {User} from "@reformetypes/userTypes";

type InstructorsTableOwnProps = {
    instructors: User[]
}

type InstructorsTableSliceProps = {}

type InstructorsTableDispatchProps = {}

type InstructorsTableProps = InstructorsTableOwnProps &
    InstructorsTableSliceProps &
    InstructorsTableDispatchProps

const InstructorsTable: React.FC<InstructorsTableProps> = ({instructors}) => {
    return (
        <div className="bg-white p-5 rounded-lg border border-dashboard-action shadow-md">
            {/*{Table header}*/}
            <div className="grid grid-cols-24 border-b font-bold text-sm text-gray-600">
                <p className="col-span-6 p-2">Name</p>
                <p className="col-span-6 p-2">Email</p>
                <p className="col-span-6 p-2">Phone number</p>
                <p className="col-span-4 p-2">Created on</p>
                <p className="col-span-2 p-2 text-center"/>
            </div>
            {/*/!*{Table body}*!/*/}

            {instructors.map(instructor => (
                <div key={instructor.id} className="grid grid-cols-24 border-b text-sm flex flex-row items-center">
                    <div className="col-span-6 p-2">
                        <p className="font-semibold">{instructor?.name || null}</p>
                    </div>
                    <div className="col-span-6 p-2">
                        <p className="font-semibold">{instructor?.email || null}</p>
                    </div>
                    <div className="col-span-6 p-2">
                        <p className="font-semibold">{instructor?.phoneNumber || null}</p>
                    </div>
                    <div className="col-span-4 p-2">
                        <p className="font-semibold">{dayjs(instructor.createAt).format("DD/MM/YYYY")}</p>
                    </div>
                    <div className="col-span-2 p-2 text-center">
                        <button className="text-blue-600 hover:text-dashboard-action"
                                // onClick={() => handleFetchClass(cls.id)}
                        >
                            <PencilIcon className={"h-4 w-4"}/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (store: RootState): InstructorsTableSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): InstructorsTableDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(InstructorsTable)
