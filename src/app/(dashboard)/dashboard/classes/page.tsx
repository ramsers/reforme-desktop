"use client"
import ClassesCalendar from "@features/classes/ClassesCalendar";
import React, {useEffect, useState} from "react";
import {PlusIcon} from "@heroicons/react/24/solid";
import ClassesTable from "@features/dashboard/classes/ClassesTable";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@store/index";
import {fetchClasses} from "@store/slices/classSlice";
import SlidingModal from "@components/slidingModal/SlidingModal";

const DashboardClassesPage: React.FC = () => {
    // List of of classes prefiltered to this week.
    // list is like a table with date, class name, instructor, edit
    // filter for date range (with current 7 days already selected)
    // Classes model are going to need a frequency so admin can set i think (may be nice to have)
    const dispatch = useDispatch();
    const classes = useSelector((state: RootState) => state.class?.classes?.results);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchClasses({ }));
    }, [])

    console.log('Classes ============', classes)
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="text-lg">Classes</p>
                    <p className="text-sm">View and manage your classes</p>
                </div>
                <div>
                    <button
                        // onClick={() => console.log('clicked')}
                        onClick={() => setIsOpen(true)}
                        className="group hover:bg-white transition-colors bg-dashboard-action cursor-pointer
                        font-semibold text-main rounded-lg px-3 py-2 flex flex-row items-center gap-1"
                    >
                        <PlusIcon className="h-5 w-5 group-hover:text-dashboard-action"/>

                        <p className="group-hover:text-dashboard-action">Create class</p>
                    </button>
                </div>
            </div>
            <ClassesTable classes={classes}/>
            <SlidingModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    )
}

export default DashboardClassesPage;
