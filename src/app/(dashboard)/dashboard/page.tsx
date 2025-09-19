"use client"

import {RootState} from '@store/index'
import React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'

type DashboardPageOwnProps = {}

type DashboardPageSliceProps = {}

type DashboardPageDispatchProps = {}

type DashboardPageProps = DashboardPageOwnProps &
    DashboardPageSliceProps &
    DashboardPageDispatchProps

const Page: React.FC<DashboardPageProps> = () => {
    return (
        <>im the admin user bruh</>
    )
}

const mapStateToProps = (store: RootState): DashboardPageSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): DashboardPageDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(Page)
