"use client"
import React from 'react'
import Layout from "@components/layout/Layout";
import ClassesCalendar from "@features/classes/ClassesCalendar";


const ClassesPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center gap-5">

            <div className="bg-brown-default p-3 rounded-full w-42 h-42 flex flex-col justify-center items-center">
                <span className="font-heading text-main text-4xl font-semibold tracking-wider ">
                    Reformé
                </span>
            </div>
            <ClassesCalendar />
        </div>
    )
}

export default ClassesPage
