import {RootState} from '@store/index'
import React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {Class} from "@reformetypes/classTypes";
import dayjs from "dayjs";
import {PencilIcon} from "@heroicons/react/24/solid";

type ClassesTableOwnProps = {
    classes: Class
}

type ClassesTableSliceProps = {}

type ClassesTableDispatchProps = {}

type ClassesTableProps = ClassesTableOwnProps &
    ClassesTableSliceProps &
    ClassesTableDispatchProps

const ClassesTable: React.FC<ClassesTableProps> = ({classes}) => {
    return (
        <div className="bg-white p-5 rounded-lg border border-dashboard-action shadow-md">
            {/*{Table header}*/}
            <div className="grid grid-cols-24 border-b font-semibold text-sm text-gray-600">
                <div className="col-span-6 p-2">Date</div>
                <div className="col-span-8 p-2">Class Name</div>
                <div className="col-span-6 p-2">Instructor</div>
                <div className="col-span-4 p-2 text-center"/>
            </div>
            {/*{Table body}*/}

            {classes.map(cls => (
                <div className="grid grid-cols-24 border-b text-sm flex flex-row items-center">
                    <div className="col-span-6 p-2">
                        <div className="bg-brown-10 w-fit p-3 rounded-lg font-bold">
                            <p>{dayjs(cls.date).format("D MMM")}</p>
                        </div>
                    </div>
                    <div className="col-span-8 p-2">
                        <p className="font-semibold">{cls.title}</p>
                    </div>
                    <div className="col-span-6 p-2">
                        <p className="font-semibold">{cls.instructor.name}</p>
                    </div>
                    <div className="col-span-4 p-2 text-center">
                        <button className="text-blue-600 hover:text-dashboard-action">
                            <PencilIcon className={"h-4 w-4"}/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (store: RootState): ClassesTableSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): ClassesTableDispatchProps => (
    {}
)

export default ClassesTable
