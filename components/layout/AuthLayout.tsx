import React from 'react'
import Image from 'next/image'

type AuthLayoutOwnProps = {
    form: React.ReactNode
    imgPath: string
    title: string
}

type AuthLayoutProps = AuthLayoutOwnProps

const AuthLayout: React.FC<AuthLayoutProps> = ({ form, imgPath, title }) => {
    return (
        <div className="flex h-full h-screen flex-col-reverse justify-between overflow-y-auto lg:flex-row lg:overflow-y-clip">
            <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-4 lg:w-2/5 lg:p-16">
                <h2 className="mb-4 justify-start !text-left text-4xl font-bold">{title}</h2>
                {form}
            </div>

            <aside className="hidden items-center justify-center overflow-hidden lg:flex lg:flex-1">
                <Image
                    src={imgPath}
                    width={1500}
                    height={500}
                    alt="Picture of the author"
                    className="h-full w-full object-cover"
                />
            </aside>
        </div>
    )
}

export default AuthLayout
