import {RootState} from '@store/store'
import React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'

type ButtonOwnProps = {}

type ButtonSliceProps = {}

type ButtonDispatchProps = {}

type ButtonProps = ButtonOwnProps &
    ButtonSliceProps &
    ButtonDispatchProps

const Button: React.FC<ButtonProps> = () => {
    return <></>
}

const mapStateToProps = (store: RootState): ButtonSliceProps => (
    {}
)

const mapDispatchToProps = (dispatch: Dispatch): ButtonDispatchProps => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(Button)
