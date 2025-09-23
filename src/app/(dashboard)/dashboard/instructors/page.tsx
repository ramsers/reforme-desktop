"use client"

import React, {useEffect, useState} from "react";
import CreateClassButtonModal from "@features/dashboard/classes/CreateClassButtonModal";
import ClassesTable from "@features/dashboard/classes/ClassesTable";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllInstructors} from "@store/slices/userSlice"
import {RootState} from "@store/index";
import {PlusIcon} from "@heroicons/react/24/solid";
import CreateInstructorButtonModal from "@features/dashboard/instructors/CreateInstructorButtonModal";
import InstructorsTable from "@features/dashboard/instructors/InstructorsTable";

const DashBoardInstructorsPage: React.FC = () => {
    const dispatch = useDispatch();
    const instructors = useSelector((state: RootState) => state.user?.instructors);

    useEffect(() => {
        dispatch(fetchAllInstructors())
    }, [])



    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="text-lg">Instructors</p>
                    <p className="text-sm">View and manage your instructors</p>
                </div>
                <CreateInstructorButtonModal />
            </div>
            <InstructorsTable instructors={instructors}/>
        </div>
    )
}

export default DashBoardInstructorsPage
