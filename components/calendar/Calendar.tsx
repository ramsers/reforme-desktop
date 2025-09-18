import {RootState} from '@store/store'
import React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'

type CalendarOwnProps = {}

type CalendarSliceProps = {}

type CalendarDispatchProps = {}

type CalendarProps = CalendarOwnProps &
    CalendarSliceProps &
    CalendarDispatchProps

const Calendar: React.FC<CalendarProps> = () => {
    return <></>
}

const mapStateToProps = (store: RootState): CalendarSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): CalendarDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
