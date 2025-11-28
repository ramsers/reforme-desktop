'use client'
import toast from 'react-hot-toast'

export const toastLoading = (msg: string) => toast.loading(msg, { id: 'global-loading' })

export const toastSuccess = (message: string) => toast.success(message, { id: 'global-loading', duration: 2500 })

export const toastError = (message: string) => toast.error(message, { id: 'global-loading', duration: 4000 })

export const toastInfo = (message: string) => toast(message, { id: 'global-loading', duration: 3000 })
