'use client'
import React from 'react'
import ClassesCalendar from '@features/classes/ClassesCalendar'

const ClassesPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="bg-brown-default flex h-42 w-42 flex-col items-center justify-center rounded-full p-3">
                <span className="font-heading text-main text-4xl font-semibold tracking-wider">Reformé</span>
            </div>
            <ClassesCalendar />
        </div>
    )
}

export default ClassesPage
