import {RootState} from '@store/index'
import React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'

type ClassesCalendarOwnProps = {}

type ClassesCalendarSliceProps = {}

type ClassesCalendarDispatchProps = {}

type ClassesCalendarProps = ClassesCalendarOwnProps &
    ClassesCalendarSliceProps &
    ClassesCalendarDispatchProps

const ClassesCalendar: React.FC<ClassesCalendarProps> = () => {
    return <>im actually the calendar component</>
}

const mapStateToProps = (store: RootState): ClassesCalendarSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): ClassesCalendarDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(ClassesCalendar)
